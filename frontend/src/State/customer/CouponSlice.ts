import { createAsyncThunk } from "@reduxjs/toolkit";
import { Cart } from "../../types/cartTypes";
import { api } from "../../config/Api";
import { CouponState } from "../../types/couponTpes";

const API_URL = "api/coupons";
export const applyCoupon = createAsyncThunk<
    Cart, {
        apply:string;
        code:string;
        orderValue:number;
        jwt:string
    },{rejectValue:string}>(
        "coupon/applyCoupon",
        async ({ apply, code, orderValue, jwt }, { rejectWithValue }) => {
            try {
                const response = await api.post(`${API_URL}/apply`,null,{
                    params: { apply, code, orderValue},
                    headers: {Authorization: `Bearer ${jwt}` }
                });
                return response.data;
            } catch (error: any) {
                return rejectWithValue(error.response?.data || error.message);
            }
        }
    );

 const initialState:CouponState={
   coupons:[],
   cart:null,
    loading:false,
    error:null,
    couponCreated:false,
    couponApplied:false
};   