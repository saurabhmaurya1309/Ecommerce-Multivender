import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { teal } from '@mui/material/colors'
import React, { useState } from 'react'
import { colors } from '../../../data/Filter/colors'
import { useSearchParams } from 'react-router-dom'
import { price } from '../../../data/Filter/price'
import { discount } from '../../../data/Filter/discount'

const FilterSection = () => {
  const [expandColor, setExpandColor] = useState(false);
  const [searchParms, setSearchParams] = useSearchParams();
  const handleColorToggle = () => {
    setExpandColor(!expandColor);
  }
  const updateFilterParams =(e:any)=>{
    const {value,name} = e.target;
    if(value){
      searchParms.set(name,value);
    }
    else{
      searchParms.delete(name);
    }
    setSearchParams(searchParms);

  }
  const clearAllFilters = () => {
    searchParms.forEach((value:any, key:any) => {
      searchParms.delete(key);
    }); 
    setSearchParams(searchParms);
  }
  return (
    <div className='-z-50 space-y-5 bg-white'>
      <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
        <p className='text-lg font-semibold'>Filters</p>
        <Button onClick={clearAllFilters}
         size='small' className='text-teal-600 cursor-pointer font-semibold'>
          Clear all
        </Button>
      </div>
      <Divider />
      <div className='px-9 space-y-6'>
        <section>

          <FormControl>
            <FormLabel sx={{ fontSize: "16px", fontWeight: "bold", color: teal[500], pb: "14px" }}
              id='color' className='text-2xl font-semibold'>Color</FormLabel>
            <RadioGroup
              aria-labelledby="color"
              defaultValue=""
              name="color"
              onChange={updateFilterParams}
            >
              {
                colors.slice(0, expandColor ? colors.length : 5).map((item) => <FormControlLabel value={item.name} control={<Radio />}
                  label={
                    <div className='flex items-center gap-3'>
                      <p>{item.name}</p>
                      <p style={{ backgroundColor: item.hex }} className={`h-5 w-5 rounded-full ${item.name === "White" ? "border" : ""} `}></p>
                    </div>
                  }
                />)
              }

            </RadioGroup>
          </FormControl>
          <div>
            <button onClick={handleColorToggle}
              className='text-primary-color cursor-pointer hover:text-teal-900 flex items-center '>
              {expandColor ? "hide" : `+${colors.length - 5} more`}
            </button>
          </div>
        </section>

        <section>
          <FormControl>
            <FormLabel sx={{ fontSize: "16px", fontWeight: "bold", color: teal[500], pb: "14px" }}
              id='price' className='text-2xl font-semibold'>Price</FormLabel>
            <RadioGroup
              aria-labelledby="price"
              onChange={updateFilterParams}
              defaultValue=""
              name="price"
            >
              {
                price.map((item) =>
                  <FormControlLabel value={item.name} control={<Radio size='small' />}
                    label={item.name}
                  />)
              }

            </RadioGroup>
          </FormControl>
        </section>
        <Divider/>
         <section>
          <FormControl>
            <FormLabel sx={{ fontSize: "16px", fontWeight: "bold", color: teal[500], pb: "14px" }}
              id='brand' className='text-2xl font-semibold'>Discount</FormLabel>
            <RadioGroup
              aria-labelledby="brand"
              onChange={updateFilterParams}
              defaultValue=""
              name="discount"
            >
              {
                discount.map((item) =>
                  <FormControlLabel value={item.name} control={<Radio size='small' />}
                    label={item.name}
                  />)
              }

            </RadioGroup>
          </FormControl>
        </section>


      </div>



    </div>
  )
}

export default FilterSection