import { Button, CircularProgress, Step, StepLabel, Stepper } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import BecomeSellerFormStep2 from './BecomeSellerFormStep2';
import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';
import { resetOtpState, sellerRegister, sendLoginSignupOtp } from '../../../State/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { toast } from 'react-toastify';

interface SellerAccountFormProps {
  switchToLogin: () => void;
}

const SellerAccountForm = ({ switchToLogin,}: SellerAccountFormProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const { otpSend, loading } = useAppSelector((state) => state.auth);
  const [countdown, setCountdown] = useState(0);
  const dispatch = useAppDispatch();
  const steps = [
    "Tax Details & Mobile",
    "Pickup Address",
    "Bank Details",
    "Supplier Details"
  ]
  const handelStep = async (value: number) => {

    if (value === -1) {
      setActiveStep(activeStep - 1);
      return;
    }

    if (activeStep === 0) {
      formik.setTouched({
        mobile: true,
        gstin: true
      });
    }

    if (activeStep === 1) {
      formik.setTouched({
        pickupAddress: {
          name: true,
          mobile: true,
          pincode: true,
          address: true,
          locality: true,
          city: true,
          state: true
        }
      });
    }

    if (activeStep === 2) {
      formik.setTouched({
        bankDetails: {
          accountNumber: true,
          ifscCode: true,
          accountHolderName: true
        }
      });
    }

    if (activeStep === 3) {
      formik.setTouched({
        sellerName: true,
        email: true,
        password: true,
        businessDetails: {
          businessName: true
        }
      });
    }

    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (activeStep === steps.length - 1) {
      handleCreateAccount();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleResendOtp = async () => {
  try {
    await dispatch(
      sendLoginSignupOtp({
        email: formik.values.email,
        role: "ROLE_SELLER",
        purpose: "EMAIL_VERIFICATION",
      })
    ).unwrap();

    formik.setFieldValue("otp", "");

    setCountdown(60);

    toast.success("New OTP sent to your email 📩");
  } catch (error: any) {
    toast.error(error.error || "Failed to resend OTP");
  }
};
  const handleCreateAccount = async () => {
    try {
      if (!otpSend) {
        await dispatch(
          sendLoginSignupOtp({
            email: formik.values.email,
            role: "ROLE_SELLER",
            purpose: "EMAIL_VERIFICATION",
          })
        ).unwrap();
          setCountdown(60);
        toast.success("OTP sent to your email 📩");
        return;
      }

      await dispatch(
        sellerRegister(formik.values)
      ).unwrap();

      toast.success("Seller account created 🎉");

      formik.resetForm();
      dispatch(resetOtpState());
      switchToLogin();

    } catch (error: any) {
      formik.setFieldValue("otp", "");
      toast.error(
        error.error || "Something went wrong"
      );
    }
  };
  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      gstin: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pincode: "",
        address: "",
        locality: "",
        city: "",
        state: ""
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: ""
      },
      password: ""
    },
    validateOnBlur: false,
    validateOnChange: false,

    validate: (values) => {
      const errors: any = {};

      // ---------------- Step 1 ----------------
      if (activeStep === 0) {
        if (!values.mobile.trim()) {
          errors.mobile = "Mobile is required";
        }

        if (!values.gstin.trim()) {
          errors.gstin = "GSTIN is required";
        }
      }

      // ---------------- Step 2 ----------------
      if (activeStep === 1) {
        const pickupErrors: any = {};

        if (!values.pickupAddress.name.trim()) {
          pickupErrors.name = "Name is required";
        }

        if (!values.pickupAddress.mobile.trim()) {
          pickupErrors.mobile = "Mobile is required";
        }

        if (!values.pickupAddress.pincode.trim()) {
          pickupErrors.pincode = "Pincode is required";
        }

        if (!values.pickupAddress.address.trim()) {
          pickupErrors.address = "Address is required";
        }

        if (!values.pickupAddress.locality.trim()) {
          pickupErrors.locality = "Locality is required";
        }

        if (!values.pickupAddress.city.trim()) {
          pickupErrors.city = "City is required";
        }

        if (!values.pickupAddress.state.trim()) {
          pickupErrors.state = "State is required";
        }

        if (Object.keys(pickupErrors).length > 0) {
          errors.pickupAddress = pickupErrors;
        }
      }

      // ---------------- Step 3 ----------------
      if (activeStep === 2) {
        const bankErrors: any = {};

        if (!values.bankDetails.accountNumber.trim()) {
          bankErrors.accountNumber =
            "Account Number is required";
        }

        if (!values.bankDetails.ifscCode.trim()) {
          bankErrors.ifscCode =
            "IFSC Code is required";
        }

        if (!values.bankDetails.accountHolderName.trim()) {
          bankErrors.accountHolderName =
            "Account Holder Name is required";
        }

        if (Object.keys(bankErrors).length > 0) {
          errors.bankDetails = bankErrors;
        }
      }

      // ---------------- Step 4 ----------------
      if (activeStep === 3) {
        if (!values.sellerName.trim()) {
          errors.sellerName =
            "Seller Name is required";
        }

        if (!values.email.trim()) {
          errors.email =
            "Email is required";
        }

        if (!values.password.trim()) {
          errors.password =
            "Password is required";
        }

        const businessErrors: any = {};

        if (!values.businessDetails.businessName.trim()) {
          businessErrors.businessName =
            "Business Name is required";
        }

        if (Object.keys(businessErrors).length > 0) {
          errors.businessDetails =
            businessErrors;
        }
      }

      return errors;
    },

    onSubmit: (values) => {
      console.log(values);
    }
  });

  useEffect(() => {
  if (countdown <= 0) return;

  const timer = setInterval(() => {
    setCountdown((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [countdown]);
  return (
    <div >
      <Stepper activeStep={activeStep} alternativeLabel>
        {
          steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>

            </Step>
          ))
        }

      </Stepper>
      <section className='mt-6 space-y-10'>
        <div>
          {activeStep === 0 ? <BecomeSellerFormStep1 formik={formik} /> : ""}
          {activeStep === 1 ? <BecomeSellerFormStep2 formik={formik} /> : ""}
          {activeStep === 2 ? <BecomeSellerFormStep3 formik={formik} /> : ""}
          {activeStep === 3 ? <BecomeSellerFormStep4 formik={formik} otpSend={otpSend}countdown={countdown} handleResendOtp={handleResendOtp} dispatch={dispatch} /> : ""}

        </div>
        <div className='flex items-center justify-between'>
          <Button onClick={() => handelStep(-1)} variant='contained' disabled={activeStep === 0}>
            Back
          </Button>
          <Button
            onClick={() => handelStep(1)}
            variant="contained"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                size={22}
                color="inherit"
              />
            ) : activeStep !== steps.length - 1 ? (
              "Continue"
            ) : otpSend ? (
              "Create Account"
            ) : (
              "Send OTP"
            )}
          </Button>
        </div>

      </section>

    </div>
  )
}

export default SellerAccountForm
