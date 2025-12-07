import React from 'react'
import ProfileFeildCard from '../../../component/ProfileFeildCard'
import { Divider } from '@mui/material'

const UserDetails = () => {
  return (
    <div className='flex justify-center py-10'>
        <div className='w-full lg:w-[70%]'>
            <div className='flex flex-col items-center pb-3 justify-between'>
                <h1 className='text-2xl text-center font-bold text-gray-600'>Persional Details</h1>
                <div className='mt-2'>
                <ProfileFeildCard keys='Name' value={"Saurabh"}/>
                <Divider/>
                <ProfileFeildCard keys='Email' value={"saurabh123@gmail.com"}/>
                <Divider/>
                <ProfileFeildCard keys='Mobile' value={"0329520935"}/>
                <Divider/>

            </div>
            </div>
            

        </div>
      
    </div>
  )
}

export default UserDetails
