import React from "react";

import {
  Add,
  Close,
  Remove,
} from "@mui/icons-material";

import {
  Button,
  Divider,
  IconButton,
} from "@mui/material";

import { CartItem } from "../../../types/cartTypes";

import {
  useAppDispatch,
} from "../../../State/Store";

import {
  deleteCartItem,
  updateCartItem,
} from "../../../State/customer/CartSlice";
import { useNavigate } from "react-router-dom";

const CartItemCard = ({
  item,
}: {
  item: CartItem;
}) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const availableStock =
    item.product?.sizeQuantities?.find(
      (sizeQuantity) =>
        sizeQuantity.size === item.size
    )?.quantity ?? 0;


  const handleProductClick = () => {

    if (!item.product?.id) {
      return;
    }

    navigate(
      `/product-details/${item.product.category?.categoryId}/${encodeURIComponent(
        item.product.title
      )}/${item.product.id}`
    );
  };

  /* =========================
     UPDATE QUANTITY
  ========================= */

  const handleUpdateQuantity = (
    value: number
  ) => {

    if (item.id === undefined) {
      return;
    }

    const newQuantity =
      item.quantity + value;

    // Never allow quantity below 1
    if (newQuantity < 1) {
      return;
    }
    if (newQuantity > availableStock) {
      return;
    }

    const jwt =
      localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    dispatch(
      updateCartItem({
        jwt,
        cartItemId: item.id,
        cartItem: {
          quantity: newQuantity,
        },
      })
    );
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = () => {

    if (item.id === undefined) {
      return;
    }

    const jwt =
      localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    dispatch(
      deleteCartItem({
        jwt,
        cartItemId: item.id,
      })
    );
  };

  return (

    <div className="border rounded-md relative bg-white">

      {/* =========================
          PRODUCT INFORMATION
      ========================= */}

      <div className="p-5 flex gap-4">

        {/* IMAGE */}

        <div
          className="flex-shrink-0 cursor-pointer"
          onClick={handleProductClick}
        >
          <img
            className="w-[90px] h-[110px] object-contain rounded-md hover:scale-105 transition-transform"
            src={item.product?.images?.[0]}
            alt={item.product?.title || "Product"}
          />
        </div>

        {/* DETAILS */}

        <div className="space-y-2 pr-8">

          <h1 className="font-semibold text-lg">

            {
              item.product?.seller
                ?.businessDetails
                ?.businessName
            }

          </h1>

          <p
            onClick={handleProductClick}
            className="text-gray-600 font-medium text-sm cursor-pointer hover:text-teal-600 transition-colors"
          >
            {item.product?.title}
          </p>

          {/* SIZE */}

          <div className="flex items-center gap-3 text-sm">

            <span className="text-gray-500">
              Size:
            </span>

            <span className="font-medium">
              {item.size}
            </span>

          </div>

          {/* COLOR */}

          <div className="flex items-center gap-3 text-sm">

            <span className="text-gray-500">
              Color:
            </span>

            <span className="font-medium">
              {item.product?.color}
            </span>

          </div>

          <p className="text-xs text-gray-400">

            <strong>Sold By:</strong>{" "}

            {
              item.product?.seller
                ?.businessDetails
                ?.businessName
            }

          </p>

          <p className="text-sm text-gray-500">
            7 Days replacement available
          </p>

        </div>

      </div>

      <Divider />

      {/* =========================
          QUANTITY + PRICE
      ========================= */}

      <div className="flex items-center justify-between px-5 py-3">

        {/* QUANTITY */}

        <div className="flex items-center gap-2">

          <Button
            onClick={() =>
              handleUpdateQuantity(-1)
            }
            disabled={item.quantity <= 1}
            size="small"
          >
            <Remove />
          </Button>

          <span className="font-medium min-w-[25px] text-center">
            {item.quantity}
          </span>

          <Button
            onClick={() =>
              handleUpdateQuantity(1)
            }
            disabled={
              item.quantity >= availableStock
            }
            size="small"
          >
            <Add />
          </Button>

          {availableStock > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {availableStock} items available in size {item.size}
            </p>
          )}

        </div>

        {/* PRICE */}

        <div className="text-right">

          <p className="text-gray-800 font-semibold">
            ₹ {(item.sellingPrice * item.quantity).toLocaleString("en-IN")}
          </p>

          {item.mrpPrice &&
            item.mrpPrice !== item.sellingPrice && (

              <p className="text-sm text-gray-400 line-through">
                ₹ {(item.mrpPrice * item.quantity).toLocaleString("en-IN")}
              </p>

            )}

        </div>

      </div>

      {/* =========================
          DELETE
      ========================= */}

      <div className="absolute right-1 top-1">

        <IconButton
          color="primary"
          onClick={handleDelete}
        >
          <Close />
        </IconButton>

      </div>

    </div>
  );
};

export default CartItemCard;