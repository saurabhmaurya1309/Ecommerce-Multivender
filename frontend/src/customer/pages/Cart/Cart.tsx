import React, { useEffect, useState } from "react";

import {
  Close,
  LocalOffer,
} from "@mui/icons-material";

import { teal } from "@mui/material/colors";

import {
  Button,
  IconButton,
  TextField,
} from "@mui/material";

import PricingCard from "./PricingCard";

import { useNavigate } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../State/Store";

import {
  fetchUserCart,
} from "../../../State/customer/CartSlice";

import CartItemCard from "./CartItemCard";

const Cart = () => {

  const [couponCode, setCouponCode] = useState("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { cart, loading } = useAppSelector(
    (state) => state.cart
  );

  /* =========================
     FETCH CART
  ========================= */

  useEffect(() => {

    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      navigate("/login", {
        state: {
          from: "/cart",
        },
      });

      return;
    }

    dispatch(fetchUserCart(jwt));

  }, [dispatch, navigate]);

  /* =========================
     COUPON
  ========================= */

  const handleApplyCoupon = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCouponCode(e.target.value);
  };

  /* =========================
     LOADING
  ========================= */

  if (loading && !cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading cart...
      </div>
    );
  }

  /* =========================
     EMPTY CART
  ========================= */

  if (!cart || cart.cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">

        <h1 className="text-2xl font-semibold">
          Your cart is empty
        </h1>

        <p className="text-gray-500">
          Looks like you haven't added anything yet.
        </p>

        <Button
          variant="contained"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>

      </div>
    );
  }

  return (

    <div className="pt-10 px-5 sm:px-10 md:px-20 lg:px-32 xl:px-48 min-h-screen">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* =========================
            CART ITEMS
        ========================= */}

        <div className="lg:col-span-2 space-y-3">

          {cart.cartItems.map((item) => (

            <CartItemCard
              item={item}
              key={item.id}
            />

          ))}

        </div>

        {/* =========================
            RIGHT SECTION
        ========================= */}

        <div className="text-sm space-y-3">

          {/* COUPON */}

          <div className="border rounded-md px-5 py-4 space-y-5">

            <div className="flex gap-3 items-center">

              <LocalOffer
                sx={{
                  color: teal[600],
                  fontSize: "18px",
                }}
              />

              <span className="font-medium">
                Apply Coupon
              </span>

            </div>

            <div className="flex items-center gap-2">

              <TextField
                fullWidth
                value={couponCode}
                onChange={handleApplyCoupon}
                placeholder="Coupon code"
                size="small"
              />

              <Button
                variant="outlined"
                disabled={!couponCode.trim()}
              >
                Apply
              </Button>

            </div>

          </div>

          {/* PRICE */}

          <div className="border rounded-md p-4">

            <PricingCard cart={cart} />

            <div className="pt-4">

              <Button
                onClick={() => navigate("/checkout")}
                fullWidth
                variant="contained"
                sx={{
                  py: "11px",
                }}
              >
                Buy Now
              </Button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;