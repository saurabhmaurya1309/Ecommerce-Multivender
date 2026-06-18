import { Button, TextField } from '@mui/material'
import React from 'react'
import { resetOtpState } from '../../../State/AuthSlice';

const BecomeSellerFormStep4 = ({ formik, otpSend,countdown,handleResendOtp,dispatch }: any) => {
    return (
        <div className='space-y-5'>
            <TextField
                fullWidth
                name='businessDetails.businessName'
                label="Business Name"
                value={formik.values.businessDetails.businessName}
                onChange={formik.handleChange}
                error={formik.touched.businessDetails?.businessName && Boolean(formik.errors.businessDetails?.businessName)}
                helperText={formik.touched.businessDetails?.businessName && formik.errors.businessDetails?.businessName}
            />
            <TextField
                fullWidth
                name='sellerName'
                label="Seller Name"
                value={formik.values.sellerName}
                onChange={formik.handleChange}
                error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
                helperText={formik.touched.sellerName && formik.errors.sellerName}
            />
            <TextField
                fullWidth
                name='email'
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                disabled={otpSend}
            />

            <TextField
                fullWidth
                name='password'
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            {otpSend && (
                <>
                    <TextField
                        fullWidth
                        name="otp"
                        label="Enter OTP"
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                    />

                    <div className="flex items-center justify-between">
                        <Button
                            size="small"
                            onClick={handleResendOtp}
                            disabled={countdown > 0}
                        >
                            {countdown > 0
                                ? `Resend OTP in ${countdown}s`
                                : "Resend OTP"}
                        </Button>

                        <Button
                            size="small"
                            color="inherit"
                            onClick={() => {
                                dispatch(resetOtpState());
                                formik.setFieldValue("otp", "");
                            }}
                        >
                            Change Email
                        </Button>
                    </div>
                </>
            )}

        </div>
    )
}

export default BecomeSellerFormStep4
