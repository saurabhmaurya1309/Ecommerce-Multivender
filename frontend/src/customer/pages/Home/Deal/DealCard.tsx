import React from 'react'

const DealCard = () => {
  return (
    <div className='w-[13rem] cursor-pointer'>
        <img  className='border-x-[7px] border-t-[7px] border-pink-600 w-full h-[12rem] object-cover object-top'
        src="https://www.gonoise.com/cdn/shop/files/Artboard_4_result_e3edbff0-3974-4d3b-8b8b-4a2ae15a1cdb.webp?v=1761717860" alt="" />
        <div className='border-4 border-black bg-black text-white p-2 text-center'>
            <p className='text-lg font-semibold'>Smart Watch</p>
            <p className='text-2xl font-semibold'>20% OFF</p>
            <p className='text-balance text-lg'>shop now</p>
        </div>
    </div>
  )
}

export default DealCard