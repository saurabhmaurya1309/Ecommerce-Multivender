import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { teal } from "@mui/material/colors";
import { Button, Divider } from "@mui/material";
import {
  Add,
  AddShoppingCart,
  Favorite,
  LocalShipping,
  Remove,
  Shield,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";

import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../../State/customer/ProductSlice";
import { addItemToCart, fetchUserCart } from '../../../State/customer/CartSlice';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductDeatils = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { productId } = useParams<{
    productId: string;
  }>();

  const { product } = useAppSelector((state) => state.product);
  const { isLoggedIn, jwt } = useAppSelector(state => state.auth);
  const { cart, loading: cartLoading } = useAppSelector(state => state.cart);

  // --------------------------------------------------
  // FETCH PRODUCT
  // --------------------------------------------------

  useEffect(() => {
    if (!productId) return;

    console.log("productId - ", productId);

    dispatch(fetchProductById(Number(productId)));
    if (jwt) {
      dispatch(fetchUserCart(jwt));
    }

    // Reset UI while loading another product
    setSelectedSize(null);
    setSelectedColor(null);
    setQuantity(1);
    setActiveImage(0);
  }, [productId, dispatch, jwt]);

  // --------------------------------------------------
  // SET DEFAULT COLOR + SIZE
  // --------------------------------------------------

  useEffect(() => {
    if (!product) return;

    // Automatically select color
    setSelectedColor(product.color || null);

    // Automatically select first available size
    const firstAvailableSize =
      product.sizeQuantities?.find(
        (item) => item.quantity > 0
      )?.size || null;

    setSelectedSize(firstAvailableSize);

    // Reset quantity
    setQuantity(1);

    // Reset image
    setActiveImage(0);
  }, [product]);

  // --------------------------------------------------
  // SELECTED SIZE STOCK
  // --------------------------------------------------

  const selectedSizeStock =
    product?.sizeQuantities?.find(
      (item) => item.size === selectedSize
    )?.quantity ?? 0;



  const cartQuantityForSelectedSize =
    cart?.cartItems?.find(
      (item) =>
        item.product?.id === product?.id &&
        item.size === selectedSize
    )?.quantity ?? 0;

  const remainingStock =
    Math.max(
      0,
      selectedSizeStock - cartQuantityForSelectedSize
    );
  // --------------------------------------------------
  // CHECK IF ANY SIZE IS AVAILABLE
  // --------------------------------------------------

  const hasAvailableSize =
    product?.sizeQuantities?.some(
      (item) => item.quantity > 0
    ) ?? false;

  // --------------------------------------------------
  // ADD TO BAG
  // --------------------------------------------------

  const handleAddToBag = async () => {

    if (!isLoggedIn || !jwt) {
      navigate("/login", {
        state: {
          from: `/product-details/${product?.category?.categoryId}/${product?.title}/${product?.id}`,
        },
      });

      return;
    }

    if (!product) {
      toast.error("Product not found");
      return;
    }

    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (selectedSizeStock <= 0) {
      toast.error("Selected size is out of stock");
      return;
    }

    if (remainingStock <= 0) {
      toast.error(
        "You already have the maximum available quantity in your cart"
      );
      return;
    }

    if (quantity > remainingStock) {
      toast.error(
        `Only ${remainingStock} more item${remainingStock > 1 ? "s are" : " is"
        } available`
      );
      return;
    }

    try {

      await dispatch(
        addItemToCart({
          jwt,
          request: {
            productId: Number(product.id),
            size: selectedSize,
            quantity,
          },
        })
      ).unwrap();

      // Get latest cart from backend
      await dispatch(
        fetchUserCart(jwt)
      ).unwrap();

      toast.success("Product added to bag 🛒");

    } catch (error: any) {

      console.error(error);

      toast.error(
        error?.error ||
        error?.message ||
        "Unable to add product to cart"
      );
    }
  };

  // --------------------------------------------------
  // WISHLIST
  // --------------------------------------------------

  const handleWishlist = () => {
    if (!product) return;

    console.log("ADD TO WISHLIST:", {
      productId: product.id,
    });

    // Later we can connect wishlist API here.
  };

  // --------------------------------------------------
  // COLOR HELPER
  // --------------------------------------------------

  const getColorCode = (color?: string) => {
    if (!color) return "#ffffff";

    const colors: Record<string, string> = {
      white: "#ffffff",
      black: "#000000",
      red: "#ef4444",
      green: "#16a34a",
      blue: "#2563eb",
      "navy blue": "#1e3a5f",
      yellow: "#facc15",
      pink: "#f9a8d4",
      grey: "#9ca3af",
      gray: "#9ca3af",
      brown: "#92400e",
      orange: "#f97316",
      purple: "#9333ea",
    };

    return colors[color.toLowerCase()] || "#e5e7eb";
  };

  // --------------------------------------------------
  // LOADING / PRODUCT NOT FOUND
  // --------------------------------------------------

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Product not found.
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="px-5 lg:px-20 pt-8 pb-16">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

        {/* =====================================================
            LEFT SIDE - PRODUCT IMAGES
        ====================================================== */}

        <section className="flex flex-col lg:flex-row gap-4">

          {/* THUMBNAILS */}

          <div className="w-full lg:w-[14%] flex flex-row lg:flex-col gap-3">

            {product.images?.map((item, index) => (

              <button
                key={index}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`
                  w-[60px]
                  h-[70px]
                  lg:w-full
                  lg:h-auto
                  rounded-md
                  overflow-hidden
                  border
                  transition
                  ${activeImage === index
                    ? "border-teal-600 ring-1 ring-teal-500"
                    : "border-gray-200 hover:border-gray-400"
                  }
                `}
              >

                <img
                  src={item}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />

              </button>

            ))}

          </div>

          {/* MAIN IMAGE */}

          <div className="w-full lg:w-[86%]">

            <div className="w-full bg-gray-50 rounded-lg overflow-hidden">

              <img
                className="w-full h-[55vh] lg:h-[75vh] object-contain rounded-lg"
                src={product.images?.[activeImage]}
                alt={product.title}
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            RIGHT SIDE - PRODUCT INFORMATION
        ====================================================== */}

        <section>

          {/* SELLER */}

          <h1 className="font-bold text-lg text-primary-color">
            {product.seller?.businessDetails?.businessName}
          </h1>


          {/* PRODUCT TITLE */}

          <p className="text-gray-600 font-semibold text-base lg:text-lg mt-1">
            {product.title}
          </p>


          {/* RATING */}

          <div className="flex justify-between items-center py-2 border border-gray-200 w-[180px] px-3 mt-4 rounded-sm">

            <div className="flex gap-1 items-center">

              <span>4</span>

              <StarIcon
                sx={{
                  color: teal[500],
                  fontSize: "17px",
                }}
              />

            </div>

            <Divider orientation="vertical" flexItem />

            <span className="text-sm">
              234 Ratings
            </span>

          </div>


          {/* PRICE */}

          <div className="mt-4">

            <div className="flex items-center gap-3 text-2xl">

              <span className="font-sans text-gray-800 font-medium">
                ₹ {product.sellingPrice}
              </span>

              <span className="line-through text-gray-400 text-lg">
                ₹ {product.mrpPrice}
              </span>

              <span className="text-primary-color font-semibold text-lg">
                {product.discountPercent}%
              </span>

            </div>

            <p className="text-sm text-gray-500 mt-1">
              Inclusive of all taxes. Free Shipping above 1500.
            </p>

          </div>


          {/* =====================================================
              BENEFITS
          ====================================================== */}

          <div className="mt-6 space-y-3">

            <div className="flex items-center gap-3">

              <Shield
                sx={{
                  color: teal[500],
                  fontSize: "21px",
                }}
              />

              <p className="text-sm">
                Authentic & Quality Assured
              </p>

            </div>


            <div className="flex items-center gap-3">

              <WorkspacePremium
                sx={{
                  color: teal[500],
                  fontSize: "21px",
                }}
              />

              <p className="text-sm">
                100% money back guarantee
              </p>

            </div>


            <div className="flex items-center gap-3">

              <LocalShipping
                sx={{
                  color: teal[500],
                  fontSize: "21px",
                }}
              />

              <p className="text-sm">
                Free Shipping & Returns
              </p>

            </div>


            <div className="flex items-center gap-3">

              <Wallet
                sx={{
                  color: teal[500],
                  fontSize: "21px",
                }}
              />

              <p className="text-sm">
                Pay on delivery might be available
              </p>

            </div>

          </div>


          {/* =====================================================
              COLOR
          ====================================================== */}

          <div className="mt-7">

            <div className="flex items-center gap-3 mb-3">

              <h3 className="text-sm font-semibold text-gray-900">
                COLOR
              </h3>

              <span className="text-sm text-gray-500">
                {selectedColor}
              </span>

            </div>


            <button
              type="button"
              onClick={() => {
                setSelectedColor(product.color || null);
              }}
              className={`
                relative
                w-12
                h-12
                rounded-full
                border-2
                transition-all
                ${selectedColor === product.color
                  ? "border-teal-600 ring-2 ring-teal-100"
                  : "border-gray-300"
                }
              `}
              style={{
                backgroundColor: getColorCode(product.color),
              }}
              title={product.color}
            >

              {selectedColor === product.color && (
                <span
                  className={`
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    font-bold
                    ${product.color?.toLowerCase() === "white"
                      ? "text-black"
                      : "text-white"
                    }
                  `}
                >
                  ✓
                </span>
              )}

            </button>

          </div>


          {/* =====================================================
              SIZE
          ====================================================== */}

          <div className="mt-7">

            <div className="flex items-center justify-between mb-3">

              <h3 className="text-sm font-semibold text-gray-900">
                SELECT SIZE
              </h3>

              {selectedSize && (
                <span className="text-sm text-teal-600 font-medium">
                  Size {selectedSize} selected
                </span>
              )}

            </div>


            <div className="flex flex-wrap gap-3">

              {product.sizeQuantities?.map((item) => {

                const isAvailable = item.quantity > 0;

                const isSelected =
                  selectedSize === item.size;

                return (

                  <button
                    key={item.size}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => {

                      if (!isAvailable) return;

                      setSelectedSize(item.size);

                      // Reset quantity whenever size changes
                      setQuantity(1);

                    }}
                    className={`
                      min-w-[72px]
                      px-4
                      py-3
                      rounded-md
                      border
                      text-center
                      transition-all

                      ${isSelected
                        ? "border-teal-600 bg-teal-50 text-teal-700 ring-1 ring-teal-600"
                        : isAvailable
                          ? "border-gray-300 text-gray-800 hover:border-teal-500 hover:bg-gray-50"
                          : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                      }
                    `}
                  >

                    <div className="font-semibold">
                      {item.size}
                    </div>

                    <div
                      className={`
                        text-[11px]
                        mt-1
                        ${isAvailable
                          ? "text-gray-500"
                          : "text-red-400"
                        }
                      `}
                    >

                      {isAvailable
                        ? `${item.quantity} left`
                        : "Out of stock"}

                    </div>

                  </button>

                );

              })}

            </div>


            {/* NO STOCK MESSAGE */}

            {!hasAvailableSize && (
              <p className="text-sm text-red-500 mt-3">
                This product is currently out of stock.
              </p>
            )}

          </div>


          {/* =====================================================
              QUANTITY
          ====================================================== */}

          <div className="mt-7">

            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              QUANTITY
            </h3>


            <div className="flex items-center">

              {/* MINUS */}

              <button
                type="button"
                disabled={quantity <= 1}
                onClick={() =>
                  setQuantity((prev) =>
                    Math.max(1, prev - 1)
                  )
                }
                className="
                  w-10
                  h-10
                  border
                  border-gray-300
                  rounded-l-md
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-50
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >

                <Remove fontSize="small" />

              </button>


              {/* QUANTITY */}

              <div
                className="
                  w-12
                  h-10
                  border-t
                  border-b
                  border-gray-300
                  flex
                  items-center
                  justify-center
                  font-medium
                "
              >
                {quantity}
              </div>


              {/* PLUS */}

              <button
                type="button"
                disabled={
                  !selectedSize ||
                  selectedSizeStock <= 0 ||
                  quantity >= remainingStock
                }
                onClick={() =>
                  setQuantity((prev) =>
                    Math.min(
                      prev + 1,
                      remainingStock
                    )
                  )
                }
                className="
                  w-10
                  h-10
                  border
                  border-gray-300
                  rounded-r-md
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-50
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >

                <Add fontSize="small" />

              </button>

            </div>


            {/* STOCK MESSAGE */}

            {selectedSize && selectedSizeStock > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                {remainingStock > 0
                  ? `${remainingStock} more item${remainingStock > 1 ? "s" : ""
                  } available in size ${selectedSize}`
                  : `Maximum available quantity already in your cart`
                }
              </p>
            )}

          </div>


          {/* =====================================================
              ACTION BUTTONS
          ====================================================== */}

          <div className="mt-10 flex items-center gap-5">

            {/* ADD TO CART */}
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCart />}
              onClick={handleAddToBag}
              disabled={
                cartLoading ||
                !selectedSize ||
                selectedSizeStock <= 0 ||
                remainingStock <= 0
              }
              sx={{
                py: "1rem",
              }}
            >
              {cartLoading ? "Adding..." : "Add to Bag"}
            </Button>


            {/* WISHLIST */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Favorite />}
              sx={{
                py: "1rem",
              }}
            >
              Add to Wishlist
            </Button>

          </div>


          {/* =====================================================
              DESCRIPTION
          ====================================================== */}

          <div className="mt-7">

            <h3 className="font-semibold text-gray-900 mb-2">
              Product Details
            </h3>

            <p className="text-gray-600 leading-7">
              {product.description}
            </p>

          </div>


          {/* =====================================================
              REVIEWS
          ====================================================== */}

          <div className="mt-7">

            <ReviewCard />

            <Divider />

          </div>

        </section>

      </div>


      {/* =====================================================
          SIMILAR PRODUCTS
      ====================================================== */}

      <div className="mt-16">

        <h1 className="text-lg font-bold">
          Similar Products
        </h1>

        <div className="pt-5">
          <SimilarProduct />
        </div>

      </div>

    </div>
  );
};

export default ProductDeatils;