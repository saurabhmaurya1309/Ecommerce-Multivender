import { ElectricBolt } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { teal } from '@mui/material/colors'
import React from 'react'

const OrderItems = () => {
  return (
    <div className='text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer'>
      <div className='flex items-center gap-5'>
        <div>
          <Avatar sizes='small' sx={{bgcolor:teal[500]}}>
            <ElectricBolt />
          </Avatar>
        </div>
        <div>
          <h1 className='font-bold text-primary-color '>PENDING</h1>
          <p>Arriving By Mon, 15 Jul</p>
        </div>
      </div>
      <div className='p-5 bg-teal-50 flex gap-3'>
        <div>
          <img className='w-[70px]' src="https://m.media-amazon.com/images/I/71S8pzCYTlL._SX679_.jpg" alt="" />
        </div>
        <div className='w-full space-y-2'>
          <h1 className='font-bold'>CrossBeats Watch</h1>
          <p>CrossBeats Everest 2.0 2025 Smart Watch for Men 1.43" True AMOLED, Always ON Display Bluetooth Calling Rugged Outdoor with Flash Light Upto 15 Days Battery Life Smartwatch 100+ Sports Mode</p>
          <p><strong>Size:</strong>Free</p>
        </div>

      </div>
      
    </div>
  )
}

export default OrderItems
