import React from 'react'
import ElectricCategory from './ElectricCategory/ElectricCategory'
import CategoryGrid from './CategoryGrid/CategoryGrid'
import Deal from './Deal/Deal'
import ShopByCategory from './ShopByCategory/ShopByCategory'
import { Button } from '@mui/material'
import { Storefront } from '@mui/icons-material'

const Home = () => {
    return (
        <div className='space-y-5 lg:space-y-10 relative pb-20'>
            <ElectricCategory />
            <CategoryGrid/>
            <div className='pt-2'>
                <h1 className='text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-10 text-center'> TODAY'S DEAL</h1>
                <Deal />
            </div>
            <section className='pt-2'>
                <h1 className='text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-10 text-center'> SHOP BY CATEGORY</h1>
                <ShopByCategory/>
            </section>

            <section className='pt-20 lg:px-20 relative h-[200px] lg:h-[450px] object-cover '>
                <img className='h-full w-full' src="https://s.udemycdn.com/browse_components/billboard/fallback_banner_image_udlite.jpg" alt="" />
                <div className='absolute top-1/2 left-4 lg:left-[15rem] font-semibold lg:text-4xl transform-translate-y-1/2'>
                    <h1>Sell your Product</h1>
                    <p className='text-lg md:text-2xl'>With <span className='logo'>Super Market</span></p>
                    <div className='pt-6 flex items-center'>
                        <Button startIcon={<Storefront/>} variant='contained'>
                            Become a Seller

                        </Button>

                    </div>
                    
                </div>
            </section>
        </div>
    )
}

export default Home