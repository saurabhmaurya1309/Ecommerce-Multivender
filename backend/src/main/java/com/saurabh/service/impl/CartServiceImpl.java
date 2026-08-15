package com.saurabh.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.saurabh.model.Cart;
import com.saurabh.model.CartItem;
import com.saurabh.model.Product;
import com.saurabh.model.User;
import com.saurabh.repository.CartItemRepository;
import com.saurabh.repository.CartRepository;
import com.saurabh.service.CartService;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    public CartServiceImpl(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository) {

        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    @Transactional
    public CartItem addCartItem(
            User user,
            Product product,
            String size,
            int quantity) throws Exception {

        if (quantity <= 0) {
            throw new Exception(
                    "Quantity must be greater than 0"
            );
        }

        int availableStock = product.getSizeQuantities()
                .stream()
                .filter(item ->
                        item.getSize()
                                .equalsIgnoreCase(size))
                .mapToInt(item ->
                        item.getQuantity())
                .findFirst()
                .orElse(0);

        if (availableStock <= 0) {
            throw new Exception(
                    "Selected size " + size +
                    " is out of stock"
            );
        }

        Cart cart =
                cartRepository.findByUserId(user.getId());

        CartItem existingItem =
                cartItemRepository
                        .findByCartAndProductAndSize(
                                cart,
                                product,
                                size
                        );

        // Existing item
        if (existingItem != null) {

            int newQuantity =
                    existingItem.getQuantity()
                    + quantity;

            if (newQuantity > availableStock) {
                throw new Exception(
                        "Only " + availableStock +
                        " items are available for size "
                        + size +
                        ". You already have "
                        + existingItem.getQuantity()
                        + " in your cart."
                );
            }

            existingItem.setQuantity(newQuantity);

            existingItem.setMrpPrice(
                    product.getMrpPrice()
            );

            existingItem.setSellingPrice(
                    product.getSellingPrice()
            );

            CartItem savedItem =
                    cartItemRepository.save(existingItem);

            recalculateCart(cart);

            return savedItem;
        }

        // New item
        if (quantity > availableStock) {
            throw new Exception(
                    "Only " + availableStock +
                    " items are available for size "
                    + size
            );
        }

        CartItem cartItem =
                new CartItem();

        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setSize(size);
        cartItem.setQuantity(quantity);
        cartItem.setUserId(user.getId());

        cartItem.setMrpPrice(
                product.getMrpPrice()
        );

        cartItem.setSellingPrice(
                product.getSellingPrice()
        );

        CartItem savedItem =
                cartItemRepository.save(cartItem);

        // IMPORTANT:
        // Keep the in-memory cart collection updated
        cart.getCartItems().add(savedItem);

        recalculateCart(cart);

        return savedItem;
    }

    @Override
    public Cart finduserCart(User user) {

        Cart cart =
                cartRepository.findByUserId(
                        user.getId()
                );

        if (cart == null) {
            return null;
        }

        recalculateCartValues(cart);

        return cart;
    }

    @Override
    @Transactional
    public Cart recalculateCart(Cart cart) {

        recalculateCartValues(cart);

        return cartRepository.save(cart);
    }

    private void recalculateCartValues(Cart cart) {

        int totalMrpPrice = 0;
        int totalSellingPrice = 0;
        int totalItem = 0;

        for (CartItem cartItem :
                cart.getCartItems()) {

            int quantity =
                    cartItem.getQuantity();

            int mrpPrice =
                    cartItem.getMrpPrice() != null
                            ? cartItem.getMrpPrice()
                            : 0;

            int sellingPrice =
                    cartItem.getSellingPrice() != null
                            ? cartItem.getSellingPrice()
                            : 0;

            totalMrpPrice +=
                    mrpPrice * quantity;

            totalSellingPrice +=
                    sellingPrice * quantity;

            totalItem += quantity;
        }

        cart.setTotalMrpPrice(
                totalMrpPrice
        );

        cart.setToatalItem(
                totalItem
        );

        cart.setTotalSellingPrice(
                totalSellingPrice
        );

        cart.setDiscount(
                calculateDiscountPercentage(
                        totalMrpPrice,
                        totalSellingPrice
                )
        );
    }

    private int calculateDiscountPercentage(
            int mrpPrice,
            int sellingPrice) {

        if (mrpPrice <= 0) {
            return 0;
        }

        int discount =
                mrpPrice - sellingPrice;

        return discount * 100 / mrpPrice;
    }
}