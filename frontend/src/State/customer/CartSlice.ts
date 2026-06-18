import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Cart, CartItem } from "../../types/cartTypes";
import { sumCartItemMrpPrice, sumCartItemSellingPrice } from "../../utils/sumCartItemMrpPrice";
import { RootState } from "../Store";
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
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addItemToCart = createAsyncThunk<CartItem, { jwt: string | null; request: AddItemRequest }>(
    "cart/addItemToCart",
    async ({ jwt, request }, { rejectWithValue }) => {
        try {
            const response = await api.put(API_URL + "/add", request, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const deleteCartItem = createAsyncThunk<any, { jwt: string | null; cartItemId: number }>(
    "cart/deleteCartItem",
    async ({ jwt, cartItemId }, { rejectWithValue }) => {
        try {
            const response = await api.delete(`${API_URL}/item/${cartItemId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateCartItem = createAsyncThunk<
    any, { jwt: string | null; cartItemId: number; cartItem: any }>(
        "cart/updateCartItem",
        async ({ jwt, cartItemId, cartItem }, { rejectWithValue }) => {
            try {
                const response = await api.put(`${API_URL}/item/${cartItemId}`, cartItem, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                return response.data;
            } catch (error: any) {
                return rejectWithValue(error.response?.data || error.message);
            }
        }
    );

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetCartState: (state) => {
            state.cart = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder 
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

            .addCase(addItemToCart.pending, (state) => { 
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToCart.fulfilled, (state, action:PayloadAction<CartItem>) => {
                state.loading = false;
                if (state.cart) {
                    state.cart.cartItems.push(action.payload);
                } 
                state.loading=false;
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.loading = false;
                if (state.cart) {
                    state.cart.cartItems = state.cart.cartItems?.filter(
                        (item) => item.id !== action.meta.arg.cartItemId
                    );
                    const mrpPrice=sumCartItemMrpPrice(state.cart?.cartItems || []);
                    const sellingPrice=sumCartItemSellingPrice(state.cart?.cartItems || []);
                    state.cart.totalMrpPrice=mrpPrice;
                    state.cart.totalSellingPrice=sellingPrice;
                }
                state.loading=false;
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                if (state.cart) {
                    const index = state.cart.cartItems?.findIndex(
                        (item) => item.id === action.meta.arg.cartItemId 
                    );
                    if (index !== undefined && index >= 0 && state.cart.cartItems) {
                        state.cart.cartItems[index] = action.payload;
                    } 
                }
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(applyCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                state.error = null;
            })
    },
});

export default cartSlice.reducer;
export const { resetCartState } = cartSlice.actions;
