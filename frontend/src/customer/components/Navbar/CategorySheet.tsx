import React from 'react'
import { menLevelTwo } from '../../../data/category/level two/menLevelTwo'
import { womenLevelTwo } from '../../../data/category/level two/womenLevelTwo'
import { electronicsLevelTwo } from '../../../data/category/level two/electronicsLevelTwo'
import { furnitureLevelTwo } from '../../../data/category/level two/furnitureLevelTwo'
import { menLevelThree } from '../../../data/category/level three/menLevelThree'
import { woemenLevelThree } from '../../../data/category/level three/womenLevelThree'
import { electronicsLevelThree } from '../../../data/category/level three/electronicsLevelThree'
import { furnitureLevelThree } from '../../../data/category/level three/furnitureLevelThree'
import { Box } from '@mui/material'
import { kidsLevelTwo } from '../../../data/category/level two/kidsLevelTwo'
import { beautyLevelTwo } from '../../../data/category/level two/beautyLevelTwo'
import { kidsLevelThree } from '../../../data/category/level three/kidsLevelThree'
import { beautyLevelThree } from '../../../data/category/level three/beautyLevelThree'

const categoryTwo: { [key: string]: any[] } = {
    men: menLevelTwo,
    women: womenLevelTwo,
    electronics: electronicsLevelTwo,
    home_living: furnitureLevelTwo,
    kids: kidsLevelTwo,
    beauty: beautyLevelTwo
}
const categoryThree: { [key: string]: any[] } = {
    men: menLevelThree,
    women: woemenLevelThree,
    electronics: electronicsLevelThree,
    home_living: furnitureLevelThree,
    kids: kidsLevelThree,
    beauty: beautyLevelThree
}
const CategorySheet = ({ selectedCategory, setShowSheet }: any) => {
    const childCategory = (category: any, parentCategoryId: any) => {
        return category.filter((child: any) => child.parentCategoryId === parentCategoryId)
    }

    return (
        <div>
            <Box sx={{ zIndex: 2 }} className='bg-white shadow-lg lg:h-[500px] overflow-y-auto'>
                <div className='flex h-full text-sm flex-wrap'>
                    {
                        categoryTwo[selectedCategory]?.map((item, index) =>
                            <div className={`p-8 lg:w-[20%] ${(Math.floor(index / 5) + index) % 2 === 0? "bg-slate-50" : "bg-white"}`} key={item.categoryId}>
                                <p className='mb-5 text-primary-color font-semibold'>{item.name}</p>
                                <ul className='space-y-3'>
                                    {
                                        childCategory(categoryThree[selectedCategory], item.categoryId).map((item: any) =>
                                            <div>
                                                <li className='hover:text-primary-color cursor-pointer'>{item.name}</li >


                                            </div>)
                                    }

                                </ul>

                            </div>)
                    }
                </div>

            </Box>
        </div>
    )
}

export default CategorySheet