import React, { useEffect, useState } from 'react'
import FilterSection from './FilterSection'
import ProductCard from './ProductCard'
import { Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, useMediaQuery, useTheme } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchAllProducts } from '../../../State/customer/ProductSlice';
import { useParams, useSearchParams } from 'react-router-dom';

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParam] = useSearchParams()
  const { category } = useParams();
  const { products } = useAppSelector(state => state.product);

  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  }
  const handlePageChange = (value: number) => {
    setPage(value);
  }
useEffect(() => {
  /* ---------- PRICE ---------- */
  const priceParam = searchParam.get("price");

  let minPrice;
  let maxPrice;

  if (priceParam) {
    const clean = priceParam.replace(/₹/g, "").trim();

    if (clean.startsWith("Below")) {
      maxPrice = Number(clean.replace("Below", "").trim());
    } 
    else if (clean.startsWith("Above")) {
      minPrice = Number(clean.replace("Above", "").trim());
    } 
    else if (clean.includes("-")) {
      const [min, max] = clean.split("-").map(p => p.trim());
      minPrice = Number(min);
      maxPrice = Number(max);
    }
  }

  /* ---------- DISCOUNT ---------- */
  const discountParam = searchParam.get("discount");
  let minDiscount;

  if (discountParam) {
    const match = discountParam.match(/\d+/);
    if (match) {
      minDiscount = Number(match[0]);
    }
  }

  const newFilter = {
    color: searchParam.get("color") || undefined, // 🔥 FIX
    minPrice,
    maxPrice,
    minDiscount,
    sort: searchParam.get("sort") || undefined,
    pageNumber: page - 1,
  };

  console.log("FILTER SENT 👉", newFilter); // DEBUG

  dispatch(fetchAllProducts(newFilter));
}, [category, page, searchParam.toString()]);


  console.log("products - ", products);
  return (
    <div className='-z-10 mt-10'>
      <div>
        <h1 className='text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2'>women sarees</h1>
      </div>
      <div className='lg:flex'>
        <section className='filter_section hidden lg:block w-[20%]'>
          <FilterSection />
        </section>
        <div className='w-full lg:w-[80%]  space-y-5'>
          <div className='flex justify-between  items-center px-9 h-[40px]'>
            <div className='relative w-[50%]'>
              {
                !isLarge && (<IconButton>
                  <FilterAlt />
                </IconButton>)
              }
              {
                !isLarge && (<Box>
                  <FilterSection />
                </Box>)
              }

            </div>
            <FormControl sx={{ width: "200px" }} size="small">
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleSortChange}
              >
                <MenuItem value={"price_low"}>Price: Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price: High - Low</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />

          <section className='prodcts_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-y-5'>
            {
              products?.map((item, index) => {
                return <ProductCard key={index} product={item} />
              })
            }
          </section>
          <div className='flex justify-center py-10'>
            <Pagination
              onChange={(e, value) => handlePageChange(value)}
              count={10} variant="outlined"
              color='primary'
            />
          </div>
        </div>


      </div>

    </div>
  )
}

export default Product