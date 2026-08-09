import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";

import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { FilterAlt } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";

import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";


const formatCategoryName = (categoryId?: string) => {
  if (!categoryId) return "All Products";

  return categoryId
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};


const Product = () => {

  const theme = useTheme();

  const isLarge = useMediaQuery(
    theme.breakpoints.up("lg")
  );

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [searchParam, setSearchParam] =
    useSearchParams();

  const { category } = useParams();

  const { products, totalPages, totalElements } =
    useAppSelector((state) => state.product);

  const [page, setPage] = useState(1);

  const categoryName =
    formatCategoryName(category);


  // ------------------------------------
  // FETCH PRODUCTS
  // ------------------------------------

  useEffect(() => {

    const priceParam =
      searchParam.get("price");

    let minPrice: number | undefined;
    let maxPrice: number | undefined;


    if (priceParam) {

      const clean =
        priceParam.replace(/₹/g, "").trim();


      if (clean.startsWith("Below")) {

        maxPrice = Number(
          clean.replace("Below", "").trim()
        );

      } else if (clean.startsWith("Above")) {

        minPrice = Number(
          clean.replace("Above", "").trim()
        );

      } else if (clean.includes("-")) {

        const [min, max] =
          clean.split("-").map((p) => p.trim());

        minPrice = Number(min);
        maxPrice = Number(max);
      }
    }


    // -------------------------------
    // DISCOUNT
    // -------------------------------

    const discountParam =
      searchParam.get("discount");

    let minDiscount:
      | number
      | undefined;


    if (discountParam) {

      const match =
        discountParam.match(/\d+/);

      if (match) {
        minDiscount =
          Number(match[0]);
      }
    }


    const filters = {

      category: category || undefined,

      color:
        searchParam.get("color") ||
        undefined,

      minPrice,

      maxPrice,

      minDiscount,

      sort:
        searchParam.get("sort") ||
        undefined,

      pageNumber: page - 1,
    };


    dispatch(
      fetchAllProducts(filters)
    );

  }, [
    category,
    page,
    searchParam.toString(),
    dispatch,
  ]);


  // ------------------------------------
  // SORT
  // ------------------------------------

  const handleSortChange = (
    event: any
  ) => {

    const value = event.target.value;

    if (value) {
      searchParam.set("sort", value);
    } else {
      searchParam.delete("sort");
    }

    setSearchParam(searchParam);

    // reset pagination
    setPage(1);
  };


  // ------------------------------------
  // PAGINATION
  // ------------------------------------

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {

    setPage(value);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (

    <div className="min-h-screen bg-white">

      {/* ======================================
          PAGE HEADER
      ====================================== */}

     {/* PAGE HEADER */}

<div className="max-w-[1500px] mx-auto px-5 lg:px-8 pt-7 pb-6">

  {/* Breadcrumb */}
  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">

    <span
      className="cursor-pointer hover:text-teal-600 transition"
      onClick={() => navigate("/")}
    >
      Home
    </span>

    <span className="text-gray-300">/</span>

    <span className="text-gray-700 font-medium">
      {categoryName}
    </span>

  </div>


  {/* Title */}
  <div className="flex items-end justify-between gap-4">

    <div>

      <h1 className="
        text-3xl
        lg:text-4xl
        font-bold
        tracking-tight
        text-gray-900
      ">
        {categoryName}
      </h1>

      <p className="mt-2 text-gray-500 text-base">
        Explore the latest {categoryName.toLowerCase()} collection
      </p>

    </div>

    <div className="hidden md:block text-sm text-gray-500">

      <span className="font-semibold text-gray-900">
        {totalElements ?? products?.length ?? 0}
      </span>

      {" "}products

    </div>

  </div>

</div>


      <Divider />


      {/* ======================================
          FILTER + SORT BAR
      ====================================== */}

     {/* FILTER / SORT BAR */}

<div className="border-y border-gray-200 bg-white">
  <div className="max-w-[1500px] mx-auto px-5 lg:px-8">

    <div className="flex items-center justify-between py-4">

      {/* Mobile Filter */}
      {!isLarge ? (
        <button
          className="
            flex items-center gap-2
            px-4 py-2
            border border-gray-300
            rounded-lg
            text-sm font-medium
            hover:border-teal-600
            hover:text-teal-600
            transition
          "
        >
          <FilterAlt fontSize="small" />
          Filters
        </button>
      ) : (
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-800">
            {totalElements ?? products?.length ?? 0}
          </span>{" "}
          products
        </div>
      )}

      {/* Sort */}
      <FormControl
        size="small"
        sx={{ minWidth: 200 }}
      >
        <InputLabel>Sort</InputLabel>

        <Select
          value={searchParam.get("sort") || ""}
          label="Sort"
          onChange={handleSortChange}
        >
          <MenuItem value="">
            Recommended
          </MenuItem>

          <MenuItem value="price_low">
            Price: Low to High
          </MenuItem>

          <MenuItem value="price_high">
            Price: High to Low
          </MenuItem>
        </Select>
      </FormControl>

    </div>

  </div>
</div>


      <Divider />


      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="max-w-[1600px] mx-auto px-5 lg:px-8">

        <div className="
  grid
  grid-cols-1
  lg:grid-cols-[240px_minmax(0,1fr)]
  gap-6
">

          {/* ==================================
              FILTER SIDEBAR
          ================================== */}

         {isLarge && (
  <aside className="border-r border-gray-200 pr-6">

    <div className="sticky top-24">

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-lg font-semibold text-gray-900">
          Filters
        </h2>

        <button
          onClick={() => {
            setSearchParam({});
            setPage(1);
          }}
          className="
            text-sm
            font-medium
            text-teal-600
            hover:text-teal-800
          "
        >
          CLEAR ALL
        </button>

      </div>

      <FilterSection />

    </div>

  </aside>
)}


          {/* ==================================
              PRODUCTS
          ================================== */}

          <main className="min-w-0">

            {/* Product count */}

            <div className="flex items-center justify-between mb-5">

              <p className="text-sm text-gray-500">

                Showing{" "}

                <span className="font-semibold text-gray-800">
                  {products?.length || 0}
                </span>{" "}

                products

              </p>

            </div>


            {/* Product grid */}

            {products &&
            products.length > 0 ? (

              <section
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  xl:grid-cols-3
                  2xl:grid-cols-4
                  gap-x-5
                  gap-y-10
                "
              >

                {products.map(
                  (item: any) => (

                    <ProductCard
                      key={item.id}
                      product={item}
                    />

                  )
                )}

              </section>

            ) : (

              /* EMPTY STATE */

              <div className="min-h-[400px] flex flex-col items-center justify-center text-center">

                <div className="text-6xl mb-5">
                  🛍️
                </div>

                <h2 className="text-xl font-semibold text-gray-800">
                  No products found
                </h2>

                <p className="text-gray-500 mt-2">
                  Try changing your filters or category.
                </p>

                <button
                  onClick={() => {
                    setSearchParam({});
                    setPage(1);
                  }}
                  className="mt-5 px-5 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition"
                >
                  Clear Filters
                </button>

              </div>

            )}


            {/* ==================================
                PAGINATION
            ================================== */}

            {totalPages > 1 && (

              <div className="flex justify-center py-12">

                <Pagination
                  page={page}
                  count={totalPages}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                  shape="rounded"
                />

              </div>

            )}

          </main>

        </div>

      </div>

    </div>
  );
};

export default Product;