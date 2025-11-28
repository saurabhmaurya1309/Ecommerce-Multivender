import { Button } from '@mui/material'
import React from 'react'
import AddressCard from './AddressCard'

const Checkout = () => {
  return (
    <div className='pt-10 px-5 sm:px-10 md:px-54 lg:px-60 min-h-screen'>
        <div className='space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9'>
            <div className='space-y-5 col-span-2'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-semibold'>Select Address</h1>
                    <Button>
                        + Add New Address
                    </Button>

                </div>
                <div className='text-xs font-medium space-y-5'>
                    <p>Saved Address</p>
                    <div className='flex flex-col gap-2'>
                        {[1,1,1].map((item,index)=>(
                            <AddressCard/>
                        ))}
                    </div>

                </div>
                <div className='py-4 px-5 rounded-md border'>
                    <Button>
                        + Add New Address
                    </Button>
                </div>

            </div>

        </div>
      
    </div>
  )
}

export default Checkout
