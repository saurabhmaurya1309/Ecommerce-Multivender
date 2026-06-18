import React, { useEffect, useState } from 'react'
import './ProductCard.css'
import { Button } from '@mui/material';
import { Favorite, ModeComment } from '@mui/icons-material';
import { teal } from '@mui/material/colors';
import { Product } from '../../../types/ProductTypes';
import { useNavigate } from 'react-router-dom';



const ProductCard = ({ product }: { product: Product }) => {
  const images = product?.images || [];
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

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
      <div
        onClick={() =>
          navigate(
            `/product-details/${product.category?.categoryId}/${encodeURIComponent(
              product.title
            )}/${product.id}`
          )
        }

        className='group px-1 relative'>
        <div className='card'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {
            product.images.map((img, index) => (
              <img src={img} key={img} alt="product_image" className='card-media object-top inset-0 transition-transform duration-1500'
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
            <h1>{product.seller?.businessDetails?.businessName}</h1>
            <p>{product?.title}</p>
          </div>
          <div className='price flex items-center gap-3'>
            <span className='font-sans text-gray-800'>₹ {product?.sellingPrice}</span>
            <span className='thin-line-through text-gray-400'>₹ {product?.mrpPrice}</span>
            <span className='text-primary-color font-semibold'>{product?.discountPercent}%</span>
          </div>
        </div>
      </div>

    </>
  )
}

export default ProductCard