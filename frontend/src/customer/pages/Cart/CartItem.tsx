import { Add, Close, Remove } from '@mui/icons-material'
import { Button, Divider, IconButton } from '@mui/material'
import React from 'react'

const CartItem = () => {
  const handleUpdateQuantity = () => {

  }
  return (
    <div className='border rounded-md relative'>
      <div className='p-5 flex gap-3'>
        <div>
          <img className='w-[90px] rounded-md'
            src="https://sudathi.com/cdn/shop/files/4838S795_1.jpg?v=1758893933&width=750" alt="" />
        </div>
        <div className='space-y-2'>
          <h1 className='font-semibold text-lg'>Virani Clothing</h1>
          <p className='text-gray-600 font-medium text-sm'>Turquiose Blue Stone Satin Deginer Saree</p>
          <p className='text-xs text-gray-400'>
            <strong>Sold By:</strong>Natural Lifestyle Products Private Limited
          </p>
          <p className='text-sm' > 7 Days replacement avilable</p>
          <p className='text-sm text-gray-500'><strong>Quantity</strong> 2</p>

        </div>

      </div>
      <Divider />
      <div className='flex items-center justify-between'>
        <div className='px-5 py-2 flex justify-between items-center'>
          <div className='flex items-center gap-2 w-[140px] justify-between'>
            <Button onClick={handleUpdateQuantity}>
              <Remove />
            </Button>
            <span>{2}</span>
            <Button onClick={handleUpdateQuantity}>
              <Add />
            </Button>

          </div>

        </div>
        <div className='pr-8'>
          <p className='text-gray-700 font-medium'>799</p>
        </div>
      </div>
      <div className='absolute right-1 top-1'>
        <IconButton color='primary'>
          <Close/>
        </IconButton>
      </div>

    </div>
  )
}

export default CartItem
