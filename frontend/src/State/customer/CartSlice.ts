import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Cart, CartItem } from "../../types/cartTypes";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../utils/sumCartItemMrpPrice";
import { applyCoupon } from "./CouponSlice";

const API_URL = "api/cart";

interface AddItemRequest {
  productId: number;
  size: string;
  quantity: number;
}

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

/* =========================
   FETCH CART
========================= */

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =========================
   ADD ITEM
========================= */

export const addItemToCart = createAsyncThunk<
  CartItem,
  {
    jwt: string | null;
    request: AddItemRequest;
  }
>(
  "cart/addItemToCart",
  async ({ jwt, request }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${API_URL}/add`,
        request,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =========================
   DELETE ITEM
========================= */

export const deleteCartItem = createAsyncThunk<
  any,
  {
    jwt: string | null;
    cartItemId: number;
  }
>(
  "cart/deleteCartItem",
  async ({ jwt, cartItemId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${API_URL}/item/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =========================
   UPDATE ITEM
========================= */

export const updateCartItem = createAsyncThunk<
  CartItem,
  {
    jwt: string | null;
    cartItemId: number;
    cartItem: {
      quantity: number;
    };
  }
>(
  "cart/updateCartItem",
  async (
    { jwt, cartItemId, cartItem },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `${API_URL}/item/${cartItemId}`,
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =========================
   SLICE
========================= */

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* =========================
         FETCH CART
      ========================= */

      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })

      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* =========================
         ADD ITEM
      ========================= */

      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addItemToCart.fulfilled, (state) => {
        state.loading = false;
        state.error = null;

        /*
         * Don't push the returned item here.
         *
         * After adding, fetchUserCart() from the component
         * so backend remains the source of truth.
         */
      })

      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* =========================
         DELETE ITEM
      ========================= */

      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (state.cart) {

          state.cart.cartItems =
            state.cart.cartItems.filter(
              (item) =>
                item.id !== action.meta.arg.cartItemId
            );

          state.cart.totalMrpPrice =
            sumCartItemMrpPrice(
              state.cart.cartItems
            );

          state.cart.totalSellingPrice =
            sumCartItemSellingPrice(
              state.cart.cartItems
            );

          state.cart.totalItem =
            state.cart.cartItems.reduce(
              (total, item) =>
                total + item.quantity,
              0
            );
        }
      })

      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* =========================
         UPDATE QUANTITY
      ========================= */

      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (state.cart) {

          const index =
            state.cart.cartItems.findIndex(
              (item) =>
                item.id === action.meta.arg.cartItemId
            );

          if (index !== -1) {

            state.cart.cartItems[index] =
              action.payload;

            state.cart.totalMrpPrice =
              sumCartItemMrpPrice(
                state.cart.cartItems
              );

            state.cart.totalSellingPrice =
              sumCartItemSellingPrice(
                state.cart.cartItems
              );

            state.cart.totalItem =
              state.cart.cartItems.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              );
          }
        }
      })

      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* =========================
         COUPON
      ========================= */

      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      });
  },
});

export default cartSlice.reducer;

export const {
  resetCartState,
} = cartSlice.actions;