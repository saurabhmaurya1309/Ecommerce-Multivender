import { Seller } from "./SellerTypes";

export interface Product {
    id?: number;

    title: string;
    description: string;

    mrpPrice: number;
    sellingPrice: number;
    discountPercent: number;

    color: string;

    images: string[];

    numRatings?: number;

    category?: Category;
    seller?: Seller;

    createdAt: Date;

    sizeQuantities?: SizeQuantity[];

    active?: boolean;
}

export interface Category {
    id?: number;
    categoryId?: string;
    name?: string | null;
    description?: string;

    parentCategory?: Category | null;
    level?: number;
}

export interface SizeQuantity {
  size: string;
  quantity: number;
}

export interface ProductFormProps {
  formik: any;
  loading: boolean;
  buttonText: string;
}
