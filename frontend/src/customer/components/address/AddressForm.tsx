import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useAppDispatch } from "../../../State/Store";
import {
  addAddress,
  updateAddress,
} from "../../../State/AuthSlice";
import type { CustomerAddress } from "../../../types/UserTypes";
import { toast } from "react-toastify";

interface AddressFormProps {
  address: CustomerAddress | null;
  onSuccess: () => void;
}

const AddressFormValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),

  mobile: Yup.string()
    .required("Mobile is required")
    .matches(/^[0-9]{10}$/, "Mobile number is not valid"),

  pincode: Yup.string()
    .required("PinCode is required")
    .matches(/^[0-9]{6}$/, "PinCode is not valid"),

  locality: Yup.string()
    .required("Locality is required"),

  address: Yup.string()
    .required("Address is required"),

  city: Yup.string()
    .required("City is required"),

  state: Yup.string()
    .required("State is required"),
});

const AddressForm = ({
  address,
  onSuccess,
}: AddressFormProps) => {

  const dispatch = useAppDispatch();

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: address?.name || "",
      mobile: address?.mobile || "",
      pincode: address?.pincode || "",
      locality: address?.locality || "",
      address: address?.address || "",
      city: address?.city || "",
      state: address?.state || "",
    },

    validationSchema: AddressFormValidationSchema,

    onSubmit: async (values, { resetForm }) => {

      try {

        if (address) {

          const addressId = address.id;

          if (addressId === undefined) {
            throw new Error("Address id is missing");
          }

          // EDIT
          await dispatch(
            updateAddress({
              id: addressId,
              address: values,
            })
          ).unwrap();

          toast.success("Address updated successfully!");

        } else {

          // ADD
          await dispatch(
            addAddress(values)
          ).unwrap();

          toast.success("Address added successfully!");

          resetForm();
        }

        onSuccess();

      } catch (error) {

        console.error(
          address
            ? "Failed to update address:"
            : "Failed to add address:",
          error
        );
      }
    },
  });

  return (
    <Box sx={{ maxWidth: "auto" }}>

      <p className="font-bold text-xl text-center pb-5">
        {address ? "Edit Address" : "Contact Details"}
      </p>

      <form onSubmit={formik.handleSubmit}>

        <Grid container spacing={3}>

          {/* NAME */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.name &&
                Boolean(formik.errors.name)
              }
              helperText={
                formik.touched.name &&
                formik.errors.name
              }
            />
          </Grid>

          {/* MOBILE */}
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="mobile"
              label="Mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.mobile &&
                Boolean(formik.errors.mobile)
              }
              helperText={
                formik.touched.mobile &&
                formik.errors.mobile
              }
            />
          </Grid>

          {/* PINCODE */}
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="pincode"
              label="Pincode"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pincode &&
                Boolean(formik.errors.pincode)
              }
              helperText={
                formik.touched.pincode &&
                formik.errors.pincode
              }
            />
          </Grid>

          {/* ADDRESS */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.address &&
                Boolean(formik.errors.address)
              }
              helperText={
                formik.touched.address &&
                formik.errors.address
              }
            />
          </Grid>

          {/* LOCALITY */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="locality"
              label="Locality"
              value={formik.values.locality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.locality &&
                Boolean(formik.errors.locality)
              }
              helperText={
                formik.touched.locality &&
                formik.errors.locality
              }
            />
          </Grid>

          {/* CITY */}
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.city &&
                Boolean(formik.errors.city)
              }
              helperText={
                formik.touched.city &&
                formik.errors.city
              }
            />
          </Grid>

          {/* STATE */}
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.state &&
                Boolean(formik.errors.state)
              }
              helperText={
                formik.touched.state &&
                formik.errors.state
              }
            />
          </Grid>

          {/* SUBMIT */}
          <Grid size={{ xs: 12 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
              sx={{ py: "14px" }}
            >
              {formik.isSubmitting
                ? address
                  ? "Updating..."
                  : "Adding..."
                : address
                  ? "Update Address"
                  : "Add Address"}
            </Button>
          </Grid>

        </Grid>

      </form>
    </Box>
  );
};

export default AddressForm;