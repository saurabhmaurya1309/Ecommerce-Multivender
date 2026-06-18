import { Cart } from "./cartTypes";

export interface Coupon {
    id: number;
    code: string;
    discountPercentage: number;
    minimumOrderValue: number;
    validityStartDate: string;
    validityEndDate: string;
    active: boolean;
}

export interface CouponState {
    coupons: Coupon[];
    cart: Cart | null;
    loading: boolean;
    error: string | null;
    couponCreated: boolean;
    couponApplied: boolean; 
}