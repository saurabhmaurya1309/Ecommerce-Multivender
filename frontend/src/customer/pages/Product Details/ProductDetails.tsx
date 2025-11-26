import React, { useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import { teal } from '@mui/material/colors';
import { Button, Divider } from '@mui/material';
import { Add, AddShoppingCart, Favorite, LocalShipping, Remove, Shield, Wallet, WorkspacePremium } from '@mui/icons-material';
import SimilarProduct from './SimilarProduct';
import ReviewCard from '../Review/ReviewCard';
const ProductDeatils = () => {
  const [quantity,setQuantity]=useState(1);
  return (
    <div className='px-5 lg:px-20 pt-10'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        <section className='flex flex-col h-full lg:flex-row gap-5'>
          <div className='w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3'>
            {[1, 1, 1, 1].map((item, index) => (
              <img key={index} className='w-[50px] lg:w-full rounded-md cursor-pointer'
                src="https://sudathi.com/cdn/shop/files/4314S606_2.jpg?v=1756404683&width=1100" alt="" />
            ))}
          </div>
          <div className='w-full lg:w-[85%] '>
            <img className='w-full h-[95vh] rounded-md'
              src="https://sudathi.com/cdn/shop/files/4314S606_1.jpg?v=1756404683&width=1100" alt="" />

          </div>

        </section>
        <section>
        <h1 className='font-bold text-lg text-primary-color'>Ram Clothing</h1>
        <p className='text-gray-500 font-semibold'>men black shirt</p>
        <div className='flex justify-between items-center py-2 border w-[180px] px-3 mt-5'>
          <div className='flex gap-1 items-center'>
            <span>4</span>
            <StarIcon sx={{color:teal[500], fontSize:"17px"}}/>
          </div>
          <Divider orientation='vertical' flexItem/>
          <span>234 Ratings</span>
        </div>
        <div>
          <div className='price flex items-center gap-3 mt-4 text-2xl'>
            <span className='font-sans text-gray-800'>₹ 400</span>
            <span className='line-through text-gray-400'>₹ 900</span>
            <span className='text-primary-color font-semibold'>60%</span>
          </div>
          <p className='text-sm'>Inclusive of all taxes. Free Shipping above 1500.</p>
        </div>

        <div className='mt-7 space-y-3'>
          <div className='flex items-center gap-4'>
            <Shield sx={{color:teal[500]}}/>
            <p>Athentic & Quality Assured</p>
          </div>
          <div className='flex items-center gap-4'>
            <WorkspacePremium sx={{color:teal[500]}}/>
            <p>100% money back guarantee</p>
          </div>
          <div className='flex items-center gap-4'>
            <LocalShipping sx={{color:teal[500]}}/>
            <p>Free Shipping & Returns</p>
          </div>
          <div className='flex items-center gap-4'>
            <Wallet sx={{color:teal[500]}}/>
            <p>Pay on delivery might be available</p>
          </div>
        </div>
        <div className='mt-7 space-y-2'>
          <h1>QUANTITY</h1>
          <div className='flex items-center gap-2 w-[140px] justify-between'>
            <Button disabled={quantity=== 1} onClick={()=>setQuantity(quantity-1)}>
              <Remove />
            </Button>
            <span>{quantity}</span>
            <Button onClick={()=>setQuantity(quantity+1)}>
              <Add/>
              
            </Button>

          </div>

        </div>

        <div className='mt-10 flex items-center gap-5 '>
          <Button
          fullWidth
          variant='contained'
          startIcon={<AddShoppingCart/>}
            sx={{py:"1rem"}}>
            Add to Bag
          </Button>
          <Button
          fullWidth
          variant='outlined'
          startIcon={<Favorite/>}
            sx={{py:"1rem"}}>
            Add to Bag
          </Button>
        </div>

        <div className='mt-5'>
          <p>The saree comes with an unstitched blouse piece
               The blouse worn by the model might be for modelling purpose only.
               Check the image of the blouse piece to understand how the actual blouse piece looks like
               </p>
        </div>
        <div className='mt-7'> 
          <ReviewCard/>
          <Divider/>
        </div>
        
      </section>

      </div>


      <div className='mt-20'>
        <h1 className='text-lg font-bold'>Similar Product</h1>
        <div className='pt-5'>

        <SimilarProduct/>
        </div>
      </div>

      


    </div>
  )
}

export default ProductDeatils
