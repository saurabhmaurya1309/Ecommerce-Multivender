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

    if (!isHovered || images.length <= 1) return;

    const interval = setInterval(() => {

      setCurrentImage(
        (prev) => (prev + 1) % images.length
      );

    }, 2000);

    return () => clearInterval(interval);

  }, [isHovered, images.length]);


  return (

    <div
      className="group cursor-pointer"
      onClick={() =>
        navigate(
          `/product-details/${product.category?.categoryId}/${encodeURIComponent(
            product.title
          )}/${product.id}`
        )
      }
    >

      {/* IMAGE */}

      <div
        className="relative w-full h-[330px] overflow-hidden rounded-xl bg-gray-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {images.map((img, index) => (

          <img
            src={img}
            key={img}
            alt={product.title}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-contain
              transition-transform
              duration-500
            "
            style={{
              transform: `
                translateX(${(index - currentImage) * 100}%)
              `
            }}
          />

        ))}


        {/* DISCOUNT */}

        {product.discountPercent > 0 && (

          <span
            className="
              absolute
              top-3
              left-3
              bg-teal-600
              text-white
              text-xs
              font-semibold
              px-2.5
              py-1
              rounded-md
            "
          >
            {product.discountPercent}% OFF
          </span>

        )}


        {/* WISHLIST */}

        <button
          onClick={(e) => e.stopPropagation()}
          className="
            absolute
            top-3
            right-3
            w-9
            h-9
            rounded-full
            bg-white
            shadow
            flex
            items-center
            justify-center
            opacity-0
            group-hover:opacity-100
            transition
            hover:bg-gray-100
          "
        >

          <Favorite
            sx={{
              fontSize: 20,
              color: "#64748b"
            }}
          />

        </button>


        {/* IMAGE DOTS */}

        {images.length > 1 && (

          <div
            className="
              absolute
              bottom-3
              left-1/2
              -translate-x-1/2
              flex
              gap-1.5
            "
          >

            {images.map((_, index) => (

              <span
                key={index}
                className={`
                  w-1.5
                  h-1.5
                  rounded-full
                  ${
                    index === currentImage
                      ? "bg-gray-800"
                      : "bg-gray-300"
                  }
                `}
              />

            ))}

          </div>

        )}

      </div>


      {/* DETAILS */}

      <div className="pt-3 px-1">

        <p className="
          text-xs
          font-medium
          text-teal-600
          uppercase
          tracking-wide
        ">
          {product.seller?.businessDetails?.businessName}
        </p>


        <h3 className="
          mt-1
          text-sm
          font-medium
          text-gray-800
          line-clamp-2
          leading-5
          group-hover:text-teal-600
          transition
        ">
          {product.title}
        </h3>


        {/* PRICE */}

        <div className="flex items-center gap-2 mt-2">

          <span className="text-base font-semibold text-gray-900">
            ₹{product.sellingPrice}
          </span>

          <span className="text-sm text-gray-400 line-through">
            ₹{product.mrpPrice}
          </span>

          <span className="text-xs font-semibold text-teal-600">
            {product.discountPercent}% OFF
          </span>

        </div>

      </div>

    </div>

  );
};

export default ProductCard;
