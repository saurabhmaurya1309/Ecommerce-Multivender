import { useFormik } from 'formik';
import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { createProduct } from '../../../State/seller/SellerProductSlice';
import { toast } from 'react-toastify';
import { SizeQuantity } from '../../../types/ProductTypes';
import ProductForm from '../../components/ProductForm';

const AddProduct = () => {
  const { loading } = useAppSelector(state => state.sellerProduct);
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      color: "",
      sizeQuantities: [] as SizeQuantity[],
      images: [],
      category: "",
      category2: "",
      category3: ""

    },
    onSubmit: async (values) => {
      try {
        if (values.images.length === 0) {
          toast.error("Please upload at least one image");
          return;
        }
        await dispatch(
          createProduct({
            request: values,
            jwt: localStorage.getItem("jwt")
          })
        ).unwrap();

        toast.success(
          "Product added successfully 🎉"
        );

        formik.resetForm();

      } catch (error: any) {
        toast.error(
          error.error || "Failed to add product"
        );
      }
    }
  })
  
 
  return (
    <ProductForm
      formik={formik}
      loading={loading}
      buttonText="Add Product"
    />
  );
  
}

export default AddProduct
