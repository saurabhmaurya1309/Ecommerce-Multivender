import React, { useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { resetOtpState, resetPassword, sendLoginSignupOtp } from "../../../State/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { toast } from "react-toastify";
import { useFormik } from "formik";

interface Props {
    switchToLogin: () => void;
}

const ForgotPasswordForm = ({ switchToLogin, }: Props) => {
    const { otpSend, loading } = useAppSelector((state) => state.auth);
    const [countdown, setCountdown] = useState(0);
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            otp: "",
            newPassword: "",
        },

        onSubmit: async (values) => {
            if (!values.otp.trim()) {
                toast.error("Please enter OTP");
                return;
            }

            if (!values.newPassword.trim()) {
                toast.error("Please enter new password");
                return;
            }

            try {
                await dispatch(
                    resetPassword(values)
                ).unwrap();

                toast.success(
                    "Password updated successfully 🎉"
                );

                dispatch(resetOtpState());

                formik.resetForm();

                switchToLogin();

            } catch (error: any) {
                formik.setFieldValue("otp", "");
                formik.setFieldValue("newPassword", "");

                toast.error(
                    error.error || "Failed to reset password"
                );
            }
        },
    });
    const handleSendOtp = async () => {
        if (!formik.values.email.trim()) {
            toast.error("Please enter email");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formik.values.email)) {
            toast.error("Please enter valid email");
            return;
        }

        try {
            await dispatch(
                sendLoginSignupOtp({
                    email: formik.values.email,
                    role: "ROLE_CUSTOMER",
                    purpose: "PASSWORD_RESET",
                })
            ).unwrap();
            setCountdown(60);
            toast.success("OTP sent successfully");
        } catch (error: any) {
            toast.error(error.error || "Failed to send OTP");
        }
    };
    const handleResendOtp = async () => {
        try {
            await dispatch(
                sendLoginSignupOtp({
                    email: formik.values.email,
                    role: "ROLE_CUSTOMER",
                    purpose: "PASSWORD_RESET",
                })
            ).unwrap();

            formik.setFieldValue("otp", "");
            formik.setFieldValue("newPassword", "");

            setCountdown(60);

            toast.success("New OTP sent 📩");
        } catch (error: any) {
            toast.error(error.error || "Failed to resend OTP");
        }
    };

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);
    return (
        <form onSubmit={formik.handleSubmit} className="space-y-5">

            {!otpSend ? (
                <>
                    <TextField
                        fullWidth
                        name="email"
                        label="Email Address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSendOtp}
                        disabled={
                            loading ||
                            !formik.values.email.trim() ||
                            !/\S+@\S+\.\S+/.test(formik.values.email)
                        }
                        sx={{ py: "11px" }}
                    >
                        {loading ? (
                            <CircularProgress
                                size={22}
                                color="inherit"
                            />
                        ) : (
                            "Send OTP"
                        )}
                    </Button>
                </>
            ) : (
                <>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold">
                            Verify OTP
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            OTP sent to
                        </p>
                        <p className="font-medium">
                            {formik.values.email}
                        </p>
                    </div>

                    <TextField
                        fullWidth
                        name="otp"
                        label="Enter OTP"
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                    />

                    <TextField
                        fullWidth
                        name="newPassword"
                        type="password"
                        label="New Password"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={
                            loading ||
                            !formik.values.otp.trim() ||
                            !formik.values.newPassword.trim()
                        }
                        sx={{ py: "11px" }}
                    >
                        {loading ? (
                            <CircularProgress
                                size={22}
                                color="inherit"
                            />
                        ) : (
                            "Reset Password"
                        )}
                    </Button>

                    <div className="flex flex-col items-center gap-2">

                        <Button
                            variant="text"
                            onClick={handleResendOtp}
                            disabled={countdown > 0}
                        >
                            {countdown > 0
                                ? `Resend OTP in ${countdown}s`
                                : "Resend OTP"}
                        </Button>

                        <Button
                            variant="text"
                            color="inherit"
                            onClick={() => {
                                dispatch(resetOtpState());
                                formik.setFieldValue("otp", "");
                                formik.setFieldValue("newPassword", "");
                            }}
                        >
                            Change Email
                        </Button>

                    </div>
                </>
            )}

            <Button
                fullWidth
                variant="text"
                onClick={switchToLogin}
            >
                Back to Login
            </Button>

        </form>
    );
};

export default ForgotPasswordForm;