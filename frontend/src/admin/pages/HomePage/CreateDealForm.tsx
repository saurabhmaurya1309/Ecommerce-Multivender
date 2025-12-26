import React  from 'react'
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  discount: Yup.number().min(0).max(100).required('Discount is required'),
  category: Yup.string().required('Category is required')
})

const CreateDealForm = () => {
  const formik = useFormik({
    initialValues: {
      discount: 0,
      category: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      console.log("submit", values)
    }
  })

  return (
    <Box component={"form"} onSubmit={formik.handleSubmit} className='space-y-6'>
      <Typography variant='h4' className='text-center text-primary-color font-bold'>
        Create Deal
      </Typography>
      <TextField
        fullWidth
        name='discount'
        label='Discount (%)'
        type='number'
        value={formik.values.discount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.discount && Boolean(formik.errors.discount)}
        helperText={formik.touched.discount && typeof formik.errors.discount === 'string' ? formik.errors.discount : undefined}
      />
      <FormControl fullWidth error={formik.touched.category && Boolean(formik.errors.category)}>
        <InputLabel>Category</InputLabel>
        <Select
          name='category'
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label='Category'
        >
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="fashion">Fashion</MenuItem>
          <MenuItem value="home">Home</MenuItem>
          <MenuItem value="beauty">Beauty</MenuItem>
        </Select>
        {formik.touched.category && formik.errors.category && (
          <Typography variant='caption' color='error'>
            {typeof formik.errors.category === 'string' ? formik.errors.category : undefined}
          </Typography>
        )}
      </FormControl>

      <Button
        fullWidth
        variant='contained'
        color='primary'
        type='submit'
      >
        Create Deal
      </Button>
    </Box>
  )
}

export default CreateDealForm