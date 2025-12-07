import React from 'react'
import UserAddressCard from './UserAddressCard'

const Address = () => {
  return (
    <div className=' flex flex-col gap-2'>
        {
            [1,1,11,1,1].map((item)=><UserAddressCard/>)
        }
      
    </div>
  )
}

export default Address
