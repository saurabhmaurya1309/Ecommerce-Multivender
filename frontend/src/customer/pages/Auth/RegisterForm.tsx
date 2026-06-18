import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, CircularProgress, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { register, resetOtpState, sendLoginSignupOtp } from "../../../State/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import OTPInput from "react-otp-input";

interface RegisterFormProps {
  switchToLogin: () => void;
}

const RegisterForm = ({
  switchToLogin,
}: RegisterFormProps) => {
  const dispatch = useAppDispatch();
  const { otpSend, loading } = useAppSelector((state) => state.auth);
  const [countdown, setCountdown] = useState(0);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      otp: "",
    },
    onSubmit: async (values) => {
      if (!values.otp) {
        toast.error("Please enter OTP");
        return;
      }

      try {
        await dispatch(register(values)).unwrap();
        toast.success("Registration successful 🎉");
        formik.resetForm();
        dispatch(resetOtpState());
        setCountdown(0);
        switchToLogin();
      } catch (error: any) {
        formik.setFieldValue("otp", "");
        toast.error(error.error || "Registration failed");
      }
    },
  });

  const handleSendOtp = async () => {
    if (!formik.values.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!formik.values.password) {
      toast.error("Please enter password");
      return;
    }

    if (formik.values.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await dispatch(sendLoginSignupOtp({ email: formik.values.email, role: "ROLE_CUSTOMER", purpose: "EMAIL_VERIFICATION", })).unwrap();
      setCountdown(60);
      toast.success("OTP sent to your email 📩");
    } catch (error: any) {
      console.error("OTP send error:", error);
      toast.error(error.error || "Failed to send OTP");
    }
  };
  const handleResendOtp = async () => {
    try {
      await dispatch(
        sendLoginSignupOtp({
          email: formik.values.email,
          role: "ROLE_CUSTOMER",
          purpose: "EMAIL_VERIFICATION",
        })
      ).unwrap();
      setCountdown(60);
      toast.success("New OTP sent to your email 📩");
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

      {!otpSend && (
        <>
          <TextField
            fullWidth
            name="fullName"
            label="Full Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
          />

          <TextField
            fullWidth
            name="email"
            label="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          <TextField
            fullWidth
            type="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleSendOtp}
            disabled={loading}
            sx={{ py: "11px" }}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Send OTP"
            )}
          </Button>
        </>
      )}

      {otpSend && (
        <div className="space-y-5 text-center">

          <div className="flex justify-center">
            <OTPInput
              value={formik.values.otp}
              onChange={(otp) =>
                formik.setFieldValue("otp", otp)
              }
              numInputs={6}
              renderSeparator={<span style={{ width: "2px" }} />}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "50px",
                    height: "50px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    border: "1px solid #666",
                    textAlign: "center",
                    margin: "0 5px",
                    background: "transparent",
                  }}
                />
              )}
            />
          </div>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ py: "11px" }}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Verify & Register"
            )}
          </Button>

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
            }}
          >
            Change Email
          </Button>

        </div>
      )}

    </form>
  );
};

export default RegisterForm;
