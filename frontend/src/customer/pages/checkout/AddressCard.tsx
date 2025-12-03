import { Radio } from '@mui/material'
import React from 'react'

const AddressCard = () => {
    const handleChange=()=>{

    }
  return (
    <div  className='py-5 gap-2 border rounded-md flex'>
        <div>
            <Radio
            checked={true}
            onChange={handleChange}
            value=""
            name="radio-buttons"
            />
        </div>

        <div className='space-y-3'>
            <h1>Saurabh</h1>
            <p className='w-[320px]'>Sikandarpur Ambedkar Nagar UP 224186</p>
            <p><strong>Mobile:</strong>0293423092</p>

        </div>
      
    </div>
  )
}

export default AddressCard
