import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import BecomeSellerFormStep2 from './BecomeSellerFormStep2';
import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Tax Details & Mobile",
    "Pickup Address",
    "Bank Details",
    "Supplier Details"
  ]
  const handelStep = (value: number) => {
    ((activeStep > 0 && value === -1) || activeStep < steps.length - 1) && setActiveStep(activeStep + value)
    activeStep === (steps.length - 1) && handleCreateAccount();
  }
  const handleCreateAccount = () => {
    console.log("create account")
  }
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
    onSubmit: (values) => {
      console.log("form submit", values);
    }
  })
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
          {activeStep=== 1 ? <BecomeSellerFormStep2 formik={formik} />:""}
           {activeStep=== 2 ? <BecomeSellerFormStep3 formik={formik} />:""}
            {activeStep=== 3 ? <BecomeSellerFormStep4 formik={formik} />:""}

        </div>
        <div className='flex items-center justify-between'>
          <Button onClick={() => handelStep(-1)} variant='contained' disabled={activeStep === 0}>
            Back
          </Button>
          <Button onClick={() => handelStep(1)} variant='contained'>
            {activeStep === (steps.length - 1) ? "Create Account" : "Continue"}
          </Button>
        </div>

      </section>

    </div>
  )
}

export default SellerAccountForm
