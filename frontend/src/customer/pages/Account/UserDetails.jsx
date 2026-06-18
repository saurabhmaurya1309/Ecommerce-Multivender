import React from 'react'
import ProfileFeildCard from '../../../component/ProfileFeildCard'
import { Divider } from '@mui/material'
import { useAppSelector } from '../../../State/Store'

const UserDetails = () => {
  const auth =useAppSelector((state)=>state.auth)
  return (
    <div className='flex justify-center py-10'>
        <div className='w-full lg:w-[70%]'>
            <div className='flex flex-col items-center pb-3 justify-between'>
                <h1 className='text-2xl text-center font-bold text-gray-600'>Persional Details</h1>
                <div className='mt-2'>
                <ProfileFeildCard keys='Name' value={auth.user?.fullName}/>
                <Divider/>
                <ProfileFeildCard keys='Email' value={auth.user?.email}/>
                <Divider/>
                <ProfileFeildCard keys='Mobile' value={auth.user?.mobile}/>
                <Divider/>

            </div>
            </div>
            

        </div>
      
    </div>
  )
}

export default UserDetails
