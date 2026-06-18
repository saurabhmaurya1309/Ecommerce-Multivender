import { Box, Button, Divider } from '@mui/material'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import OrderStepper from './OrderStepper';
import { Payment } from '@mui/icons-material';


const OrderDetails = () => {
    const navigate=useNavigate();
  return (
    <Box className='space-y-5'>
        <section className='flex flex-col gap-5 justify-center items-center'>
            <img className='w-[100px]'
            src={"https://m.media-amazon.com/images/I/71S8pzCYTlL._SX679_.jpg"} alt="" />
            <div className='text-sm space-y-1 text-center'>
                <h1 className='font-bold'>Smart Watch</h1>
                <p>CrossBeats Everest 2.0 2025 Smart Watch for Men 1.43" True AMOLED, Always ON Display Bluetooth Calling Rugged Outdoor with Flash Light Upto 15 Days Battery Life Smartwatch 100+ Sports Mode</p>
                <p><strong>Size:</strong>M</p>
            </div>
            <div>
                <Button onClick={()=>navigate(`/review/${5}/create`)}>
                    Write Review
                </Button>
            </div>
        </section>

        <section className='border p-5'>
            <OrderStepper orderStatus={"SHIPPED"}/>
        </section>
        <div className='border p-5'>
            <h1 className='font-bold pb-3'> Delivery Address</h1>
            <div className='text-sm space-y-2'>
                <div className='flex gap-5 font-medium'>
                    <p>Saurabh</p>
                    <Divider flexItem orientation='vertical'/>
                    <p>2039542012</p>
                </div>
                <p>Sikandarpur,Ambedkar Nagar UP </p>
            </div>
        </div>
        <div className='border space-y-4'>
            <div className='flex justify-between text-sm pt-5 px-5'>
                <div className='space-y-1'>
                    <p className='font-bold'>Total Item Price</p>
                    <p>You saved 
                        <span className='text-green-500 font-medium text-xs ml-2 mr-2'>₹ 699.00</span>
                        on this item </p>
                </div>
                <p className='font-medium'>₹ 799.00</p>
            </div>
            <div className='px-5'>
                <div className='bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3'>
                    <Payment/>
                    <p>Pay On Delivery</p>

                </div>

            </div>
        </div>
        <Divider/>
        <div className='px-5 pb-5'>
            <p className='text-xs'><strong>Sold By:</strong>Noice Watch</p>
        </div>

        <div className='p-10'>
            <Button
            disabled={true}
            color='error'
            sx={{py:"0.7rem"}}
            className=''
            variant='outlined'
            fullWidth
            >{true?"Order canceled":"Cancel Order"}

            </Button>
        </div>
      
    </Box>
  )
}

export default OrderDetails
