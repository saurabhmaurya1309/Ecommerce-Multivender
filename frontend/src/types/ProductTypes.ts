import { Seller } from "./SellerTypes";

export interface Product {
    id?: number;
    title: string;
    description: string;
    mrpPrice: number;
    sellingPrice: number;
    discountPercent: number;
    quantity: number;
    color: string;
    images: string[];
    stock: number;
    numRatings?: number;
    category?:Category;
    seller?:Seller;
    createdAt:Date;
    size?:string;
}

export interface Category {
    id?: number;
    name: string;
    description?: string;
}
