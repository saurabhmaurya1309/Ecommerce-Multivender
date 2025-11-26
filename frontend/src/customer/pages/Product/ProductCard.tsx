import React, { useEffect, useState } from 'react'
import './ProductCard.css'
import { Button } from '@mui/material';
import { Favorite, ModeComment } from '@mui/icons-material';
import { teal } from '@mui/material/colors';

const images = [
  "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2025/NOVEMBER/13/tLGNc56L_b669928d8c354402bd2ed0fed14a7de0.jpg",
  "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12904100/2022/2/17/39ce5d73-e1a7-4546-95c5-0bfd3f0475a61645087486982-Roadster-Men-Green--White-Pure-Cotton-Colourblocked-Polo-Col-1.jpg",
  "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/z/u/4/s-tbh-posa-mc-the-bear-house-original-imagr827ht2farcn.jpeg?q=70",
  "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/e/e/h/s-den-sng-01-regrowth-original-imaganhquyfzd3kz-bb.jpeg?q=70"
]
const ProductCard = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: any
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      }, 2000);
    }
    else if (interval) {
      clearInterval(interval);
      interval = null;
    }
    return () => clearInterval(interval);

  }, [isHovered])
  return (
    <>
      <div className='group px-1 relative'>
        <div className='card'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {
            images.map((img, index) => (
              <img src={img} alt="product_image" className='card-media object-top inset-0 transition-transform duration-1500'
                style={{ transform: `translateX(${(index - currentImage) * 100}%)` }}
              />

            ))
          }
          {
            isHovered && (
              <div className='indicator flex flex-col items-center space-y-2 '>
                <div className='flex gap-3'>
                  <Button variant='contained' color='secondary'>
                    <Favorite sx={{ color: teal[500] }} />
                  </Button>

                  <Button variant='contained' color='secondary'> 
                    <ModeComment sx={{ color: teal[500] }} />
                  </Button>
                </div>
              </div>
            )
          }

        </div>
        <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
          <div className='name'>
            <h1>Niky</h1>
            <p>Blue Shirt</p>
          </div>
          <div className='price flex items-center gap-3'>
            <span className='font-sans text-gray-800'>₹ 400</span>
            <span className='thin-line-through text-gray-400'>₹ 900</span>
            <span className='text-primary-color font-semibold'>60%</span>
          </div>
        </div>
      </div>

    </>
  )
}

export default ProductCard