import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useAppDispatch } from '../../../State/Store'
import { login } from '../../../State/AuthSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface Props {
  openForgotPassword: () => void;
}

const SellerLoginForm = ({
  openForgotPassword,
}: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const result = await dispatch(
          login(values)
        ).unwrap();

        toast.success(result.message);

        if (result.role === "ROLE_SELLER") {
          navigate("/seller");
        }

      } catch (error: any) {
        toast.error(
          error.error || "Login failed"
        );
      }
    }
  });

  return (
    <div>
      <h1 className='text-center font-bold text-primary-color pb-5'>Login As a Seller</h1>
      <div className='space-y-5'>
        <TextField
          fullWidth
          name='email'
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          type="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <div className="text-right">
          <button
            type="button"
            onClick={openForgotPassword}
            className="text-sm text-primary-color hover:underline"
          >
            Forgot Password?
          </button>
        </div>
        <Button
          onClick={() => formik.submitForm()}
          fullWidth
          variant="contained"
          sx={{ py: "11px" }}
        >
          Login
        </Button>

      </div>
    </div>

  )
}

export default SellerLoginForm
