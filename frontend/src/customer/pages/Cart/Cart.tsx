import React, { useState } from 'react'
import CartItem from './CartItem'
import { Close, LocalOffer } from '@mui/icons-material'
import { teal } from '@mui/material/colors'
import { Button, IconButton, TextField } from '@mui/material'
import PricingCard from './PricingCard'

const Cart = () => {
  const [cuponCode, setCuponCode] = useState('')
  const handleApplyCoupon = (e:any) => {
    setCuponCode(e.target.value)
  }
  return (
    <div className='pt-10 px-5 sm:px-10 md:px-56 min-h-screen'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5  '>
        <div className='cartItemSection lg:col-span-2 space-y-3'>
          {
            [1, 1, 1, 11, 1, 1, 1, 1].map((item, index) => (
              <CartItem />
            ))
          }
        </div>
        <div className='col-span-1 text-sm space-y-3 '>
          <div className='border rounded-md px-5 py-3 space-y-5'>
            <div className='flex gap-3 text-sm items-center '>
              <div className='flex gap-3 text-sm items-center '>
                <LocalOffer sx={{ color: teal[600], fontSize: "17px " }} />
              </div>
              <span>Apply Coupon</span>
            </div>
            {
              true?
            <div className='flex items-center justify-between'>
              <TextField onChange={handleApplyCoupon}
               id="outlined-basic"
              placeholder='cupon code' size='small'
              variant='outlined'/>
              <Button>
                Apply
              </Button>
            </div>:
            <div className='flex'>
              <div className='pt-1 pl-5 pr-3 border rounded-md flex gap-2 items-center'>
                <span>SALE100 Applied</span>
                <IconButton>
                  <Close className='text-red-600'/>
                </IconButton>
              </div>
            </div>
}
          </div>
          <div className='border rounded-md'>
            <PricingCard/>
            <div className='py-2'>
              <Button fullWidth variant='contained' sx={{py:"11px"}} >
                Buy Now

              </Button>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Cart
