import { Product } from "./ProductTypes";
import { Address, User } from "./UserTypes";

export interface OrderState {
    orders: Order[];
    orderItems: OrderItem[] | null;
    currentOrder: Order | null;
    paymentOrder: any | null;
    loading: boolean;
    error: string | null;
    orderCancelled: boolean;
}
export interface Order {
    id: string;
    orderId: string;
    user:User;
    sellerId: number;
    orderItems: OrderItem[];
    orderDate: string;
    shippingAddress: Address;
    paymentDetails: any;
    totalMrpPrice: number;
    totalSellingPrice?: number;
    discount?: number;
    orderStatus: OrderStatus;
    totalItem: number;
    deliverDate: string;
}

export enum OrderStatus {
    PENDING = "PENDING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}

export interface OrderItem {
    id: number;
    order: Order;
    product:Product;
    size: string;
    quantity: number;
    sellingPrice: number;
    mrpPrice: number;
    userId: number;
}