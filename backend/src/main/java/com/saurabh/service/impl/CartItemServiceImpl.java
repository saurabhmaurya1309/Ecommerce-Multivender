package com.saurabh.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.saurabh.model.Cart;
import com.saurabh.model.CartItem;
import com.saurabh.model.Product;
import com.saurabh.model.User;
import com.saurabh.repository.CartItemRepository;
import com.saurabh.service.CartItemService;
import com.saurabh.service.CartService;

@Service
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;
    private final CartService cartService;

    public CartItemServiceImpl(
            CartItemRepository cartItemRepository,
            CartService cartService) {

        this.cartItemRepository = cartItemRepository;
        this.cartService = cartService;
    }

    @Override
    @Transactional
    public CartItem updateCartItem(
            Long userId,
            Long id,
            CartItem cartItem) throws Exception {

        CartItem item =
                findCartItemById(id);

        User cartItemUser =
                item.getCart().getUser();

        if (!cartItemUser.getId().equals(userId)) {
            throw new Exception(
                    "You can not update this cart item"
            );
        }

        int requestedQuantity =
                cartItem.getQuantity();

        if (requestedQuantity <= 0) {
            throw new Exception(
                    "Quantity must be greater than 0"
            );
        }

        Product product =
                item.getProduct();

        String size =
                item.getSize();

        int availableStock =
                product.getSizeQuantities()
                        .stream()
                        .filter(sizeQuantity ->
                                sizeQuantity.getSize()
                                        .equalsIgnoreCase(size))
                        .mapToInt(sizeQuantity ->
                                sizeQuantity.getQuantity())
                        .findFirst()
                        .orElse(0);

        if (availableStock <= 0) {
            throw new Exception(
                    "Selected size " + size +
                    " is out of stock"
            );
        }

        if (requestedQuantity > availableStock) {
            throw new Exception(
                    "Only " + availableStock +
                    " items are available for size "
                    + size
            );
        }

        item.setQuantity(
                requestedQuantity
        );

        item.setMrpPrice(
                product.getMrpPrice()
        );

        item.setSellingPrice(
                product.getSellingPrice()
        );

        CartItem savedItem =
                cartItemRepository.save(item);

        // Synchronize cart totals
        cartService.recalculateCart(
                item.getCart()
        );

        return savedItem;
    }

    @Override
    @Transactional
    public void removeCartItem(
            Long userId,
            Long cartItemId) throws Exception {

        CartItem item =
                findCartItemById(cartItemId);

        User cartItemUser =
                item.getCart().getUser();

        if (!cartItemUser.getId().equals(userId)) {
            throw new Exception(
                    "You can not delete this item"
            );
        }

        Cart cart =
                item.getCart();

        cartItemRepository.delete(item);

        // Keep in-memory collection consistent
        cart.getCartItems().remove(item);

        // Synchronize cart totals
        cartService.recalculateCart(cart);
    }

    @Override
    public CartItem findCartItemById(Long id)
            throws Exception {

        return cartItemRepository
                .findById(id)
                .orElseThrow(() ->
                        new Exception(
                                "cart item not found with id "
                                + id
                        ));
    }
}