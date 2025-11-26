import { Avatar, Box, Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AddShoppingCart, FavoriteBorder, Storefront } from '@mui/icons-material';
import CategorySheet from './CategorySheet';
import { mainLevelCategory } from '../../../data/category/mainLevelCategory';
const Navbar = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
    const [selectedCategory, setSelectedCategory] = useState("men");
    const [showCategoryheet, setShowCategorySheet] = useState(false);
    return (
        <>
            <Box className='bg-white top-0 left-0 right-0 sticky' sx={{ zIndex: 2 }}>
                <div className='flex items-center justify-between px-5 lg:px-20 h-[70px] border-b'>
                    <div className='flex items-center gap-9'>
                        <div className='flex items-center gap-2'>
                            {!isLarge &&
                                <IconButton>
                                    <MenuIcon />
                                </IconButton>
                            }
                            <h1 className='logo cursor-pointer whitespace-nowrap text-lg md:text-2xl text-primary-color '>
                                Super Market
                            </h1>
                        </div>
                        <ul className='flex items-center font-medium text-gray-800'>
                            {
                                mainLevelCategory.map((item) => (
                                    <li
                                        onMouseLeave={() => { setShowCategorySheet(false) }}
                                        onMouseEnter={() => {
                                            setSelectedCategory(item.categoryId);
                                            setShowCategorySheet(true)
                                        }}
                                        key={item.categoryId} className='mainCategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color whitespace-nowrap flex items-center'>{item.name}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className='flex items-center gap-1 lg:gap-2'>
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                        {
                            true ?
                                <Button className='flex items-center gap-2'>
                                    <Avatar sx={{ width: 29, height: 29 }} src='data:image/png;base64,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'>

                                    </Avatar>
                                    <h1 className='font-semibold hidden lg:block'>
                                        Super
                                    </h1>
                                </Button>
                                :
                                <Button variant='contained'>Login</Button>
                        }
                        <IconButton>
                            <FavoriteBorder sx={{ fontSize: 29 }} />
                        </IconButton>
                        <IconButton>
                            <AddShoppingCart sx={{ fontSize: 29 }} className='text-gray-700' />
                        </IconButton>

                        {isLarge &&
                            <Button className='whitespace-nowrap' startIcon={<Storefront />} variant='outlined'>Become Seller</Button>

                        }

                    </div>
                </div>
                {
                    showCategoryheet && <div
                        onMouseLeave={() => setShowCategorySheet(false)}
                        onMouseEnter={() => setShowCategorySheet(true)}
                        className='categorySheet absolute top-[4.41rem] left-20 right-20 border'>
                        <CategorySheet selectedCategory={selectedCategory} />
                    </div>
                }
            </Box>
        </>
    )
}

export default Navbar