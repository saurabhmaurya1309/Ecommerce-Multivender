import { Box,  Grid, TextField } from '@mui/material'
import React from 'react'


const BecomeSellerFormStep2 = ({formik}:any) => {
  return (
    <Box>
      <div className='mt-2'>
        <Grid container spacing={3}>
          <Grid size={{xs:12}}> 
            <TextField
            fullWidth
            name='name'
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            >
            </TextField>
          </Grid>
           <Grid size={{xs:6}}>
            <TextField
            fullWidth
            name='mobile'
            label="Mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            >
            </TextField>
          </Grid>
           <Grid size={{xs:6}}>
            <TextField
            fullWidth
            name='pinCode'
            label="pinCode"
            value={formik.values.pinCode}
            onChange={formik.handleChange}
            error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
            helperText={formik.touched.pinCode && formik.errors.pinCode}
            >
            </TextField>
          </Grid>
           <Grid size={{xs:12}}>
            <TextField
            fullWidth
            name='address'
            label="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            >
            </TextField>
          </Grid>
           <Grid size={{xs:12}}>
            <TextField
            fullWidth
            name='locality'
            label="locality"
            value={formik.values.locality}
            onChange={formik.handleChange}
            error={formik.touched.locality && Boolean(formik.errors.locality)}
            helperText={formik.touched.locality && formik.errors.locality}
            >
            </TextField>
          </Grid>
           <Grid size={{xs:6}}>
            <TextField
            fullWidth
            name='city'
            label="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            >
            </TextField>
          </Grid>
           <Grid size={{xs:6}}>
            <TextField
            fullWidth
            name='state'
            label="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
            >
            </TextField>
          </Grid>
         
           

        </Grid>
      </div>
    </Box>
  )
}

export default BecomeSellerFormStep2
