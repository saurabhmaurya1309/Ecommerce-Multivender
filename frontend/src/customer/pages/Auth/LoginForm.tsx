import React from "react";
import { useFormik } from "formik";
import { Button, CircularProgress, TextField } from "@mui/material";
import { loginCustomer } from "../../../State/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  openForgotPassword: () => void;
}

const LoginForm = ({ openForgotPassword }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } =
    useAppSelector(
      (state) => state.auth
    );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      if (!values.email.trim()) {
        toast.error("Please enter email");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(values.email)) {
        toast.error("Please enter a valid email");
        return;
      }

      if (!values.password.trim()) {
        toast.error("Please enter password");
        return;
      }
      try {
        await dispatch(loginCustomer(values)).unwrap();
        toast.success("Login successful 🎉");
        navigate("/"); // ✅ redirect to home
      } catch (error: any) {
        toast.error(error.error || "Invalid credentials or login failed");
      }
    },
  });



  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">

      <TextField
        fullWidth
        name="email"
        label="Email Address"
        value={formik.values.email}
        onChange={formik.handleChange}
        disabled={loading}
      />

      <TextField
        fullWidth
        type="password"
        name="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />

      <div className="flex justify-end">
        <Button
          size="small"
          variant="text"
          onClick={openForgotPassword}
        >
          Forgot Password?
        </Button>
      </div>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        disabled={
          loading ||
          !formik.values.email.trim() ||
          !formik.values.password.trim()
        }
        sx={{ py: "11px" }}
      >
        {loading ? (
          <CircularProgress
            size={22}
            color="inherit"
          />
        ) : (
          "Login"
        )}
      </Button>


    </form>
  );
};

export default LoginForm;
