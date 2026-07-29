import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import ProductForm from "../../components/ProductForm";

import { fetchProductById, updateProduct } from "../../../State/seller/SellerProductSlice";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { toast } from "react-toastify";

const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { selectedProduct, loading, } = useAppSelector((state) => state.sellerProduct);
    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(Number(productId)));
        }
    }, [dispatch, productId]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: selectedProduct
            ? {
                title: selectedProduct.title || "",
                description: selectedProduct.description || "",
                mrpPrice: selectedProduct.mrpPrice || "",
                sellingPrice: selectedProduct.sellingPrice || "",
                color: selectedProduct.color || "",
                images: selectedProduct.images || [],
                sizeQuantities:
                    selectedProduct.sizeQuantities || [],

                category:
                    selectedProduct.category?.parentCategory
                        ?.parentCategory?.categoryId || "",

                category2:
                    selectedProduct.category?.parentCategory
                        ?.categoryId || "",

                category3:
                    selectedProduct.category?.categoryId || "",
            }
            : {
                title: "",
                description: "",
                mrpPrice: "",
                sellingPrice: "",
                color: "",
                images: [],
                sizeQuantities: [],
                category: "",
                category2: "",
                category3: "",
            },

        onSubmit: async (values) => {
            try {
                await dispatch(
                    updateProduct({
                        productId: Number(productId),
                        request: values,
                    })
                ).unwrap();

                toast.success("Product updated successfully 🎉");

                navigate("/seller/products");

            } catch (error: any) {
                toast.error(
                    error.error || "Failed to update product"
                );
            }
        },
    });

    if (!selectedProduct) {
        return (
            <div className="flex justify-center p-10">
                <CircularProgress />
            </div>
        );
    }

    return (
        <ProductForm
            formik={formik}
            loading={loading}
            buttonText="Update Product"
        />
    );
};

export default EditProduct;