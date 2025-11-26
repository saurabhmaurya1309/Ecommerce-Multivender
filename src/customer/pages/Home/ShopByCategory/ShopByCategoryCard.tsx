import React from 'react'
import './ShopByCategory.css';

const ShopByCategoryCard = () => {
  return (
    <div className='flex flex-col gap-3 items-center justify-center group cursor-pointer'>
        <div className='custome-border w-[150px] h-[150px] rounded-full lg:w-[249px] lg:h-[249px] bg-primary-color'>
            <img className='rounded-full group hover:scale-95 transition-transform transform-duration-700 object-cover object-top w-full h-full'
            src="https://img.kwcdn.com/product/open/b5f9c4665c114910b31a3d12c24374a8-goods.jpeg?imageMogr2/auto-orient|imageView2/2/w/800/q/70/format/webp" alt="" />

        </div>
        <h1>Kitchen & Table</h1>

    </div>
  )
}

export default ShopByCategoryCard