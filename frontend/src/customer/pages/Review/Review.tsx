import React from 'react'
import ReviewCard from './ReviewCard'
import { Divider } from '@mui/material'

const Review = () => {
  return (
    <div className='px-5 pt-2 lg:px-20 flex flex-col lg:flex-row gap-20'>
      <section className='w-full md:1/2 lg:w-[30%] space-y-2'>
      <img src="https://sudathi.com/cdn/shop/files/Shweta_Tiwari_Amber_Yellow_Banarasi_Silk_Saree_2.jpg?v=1764238014&width=1780" alt="" />

      <div>
        <div>
            <p  className='font-bold text-xl'>  Raam Clothing </p>
            <p className='text-lg text-gray-600'>Silk Saree</p>
        </div>
        <div className='price flex items-center gap-3  text-2xl'>
            <span className='font-sans text-gray-800'>₹ 400</span>
            <span className='line-through text-gray-400'>₹ 900</span>
            <span className='text-primary-color font-semibold'>60% Off</span>
          </div>
      </div>

      </section>

      <section className='space-y-5 w-full'>
        {
          [1,1,1,1,1].map((item,index)=>(<div className='space-y-2'>
            <ReviewCard/>
            <Divider/>
          </div>
          ))
        }
      </section>

      
    </div>
  )
}

export default Review
