import { Delete } from '@mui/icons-material'
import { Avatar, Box, Grid, IconButton, Rating } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const ReviewCard = () => {
    return (
        <div className='flex justify-between'>
            <Grid container spacing={8}>
                <Grid size={{ xs: 1 }}>
                    <Box>
                        <Avatar className='text-white' sx={{ width: 56, height: 56, bgcolor: "#5155FD" }}>
                            S
                        </Avatar>

                    </Box>
                </Grid>

                <Grid size={{ xs: 9 }}>
                    <div className='space-y-2'>
                        <div>
                            <p className='font-semibold text-lg'>Saurabh Maurya</p>
                            <p className='opacity-70'>2025-10-12T23:16:07.24242</p>
                        </div>
                    </div>
                    <Rating name="read-only" value={4.5} readOnly precision={.5} />
                    <p>Value For money Great product </p>
                    <div>
                        <img className='w-24 h-24 object-fit'
                         src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcROSEhAouPUStVBaBCqThefUt_W2MZMLpRGUi-D43-3ubIA8UPI3Wyu1gieRx8nEuKRqB9BCFNkEWNzq5j9B4AKSphn1OrfHSnMDFxoHyRMi_K1DpqrTMy1&usqp=CAc"
                            alt="product_image" />

                    </div>
                </Grid>
                



            </Grid>
           <div>
             <IconButton>
                    <Delete sx={{color:red[700]}}/>
                </IconButton>
           </div>

        </div>
    )
}

export default ReviewCard
