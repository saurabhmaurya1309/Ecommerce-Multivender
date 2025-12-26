import React from 'react'
import { Box, Grid, TextField, Button, InputAdornment, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'
import { useFormik } from 'formik'

interface CouponFormValues {
  code: string
  discountPercentage: number
  validityStartDate: Dayjs | null
  validityEndDate: Dayjs | null
  minimumOrderValue: number
}

const AddNewCouponForm: React.FC = () => {
  const formik = useFormik<CouponFormValues>({
    initialValues: {
      code: '',
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
    },
    onSubmit: (values) => {
      const formatted = {
        ...values,
        validityStartDate: values.validityStartDate?.toISOString(),
        validityEndDate: values.validityEndDate?.toISOString(),
      }
      console.log('submitted coupon', formatted)
    },
  })

  return (
    <div>
      <h1 className='font-bold text-primary-color text-2xl text-center pb-5'> Create New Coupon</h1>
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Create New Coupon
        </Typography>
        <Grid container spacing={2}>
          <Grid  size={{xs:12,sm:6}}>
            <TextField
              fullWidth
              name="code"
              label="Coupon Code"
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />
          </Grid>

          <Grid size={{xs:12,sm:6}}>
            <TextField
              fullWidth
              name="discountPercentage"
              label="Discount (%)"
              type="number"
              value={formik.values.discountPercentage}
              onChange={formik.handleChange}
              
            />
          </Grid>

          <Grid size={{xs:12,sm:6}}>
            <DatePicker
              label="Start Date"
              value={formik.values.validityStartDate}
              onChange={formik.handleChange}
              sx={{width:"100%"}}
            />
          </Grid>

          <Grid size={{xs:12,sm:6}}>
            <DatePicker
              label="End Date"
              value={formik.values.validityEndDate}
              onChange={formik.handleChange}
              sx={{width:"100%"}}
            />
          </Grid>

          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              name="minimumOrderValue"
              label="Minimum Order Value"
              type="number"
              value={formik.values.minimumOrderValue}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{xs:12}}>
            <Button fullWidth variant="contained" className='text-2xl font-bold' color="primary" sx={{ py: 1.5 }}>
              Save Coupon
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
    </div>
  )
}

export default AddNewCouponForm
