import React from 'react'

const CategoryGrid = () => {
  return (
    <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
        <div className='col-span-3 row-span-12 text-white'>
            <img  className='w-full h-full object-cover rounded-md object-top'
            src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/25293736/2023/10/3/087e5755-ecf3-47da-b9e4-a5636f760b881696272239181KALINIBlueRedEmbroideredThreadWorkSemi-StitchedLehengaUnstit1.jpg" alt="" />

        </div>
         <div className='col-span-2 row-span-6 text-white'>
            <img className='w-full h-full object-cover rounded-md object-top'
            src="https://www.regalshoes.in/cdn/shop/files/32381MAROON_1_cb4601a9-0537-4f75-80ea-51e01c3f8986.jpg?v=1757492194&width=700" alt="" />
        </div>
        <div className='col-span-4 row-span-6 text-white'>
            <img className='w-full h-full object-cover rounded-md object-top'
            src="https://images.pexels.com/photos/12730873/pexels-photo-12730873.jpeg" alt="" />
        </div>
        <div className='col-span-3 row-span-12 text-white'>
            <img className='w-full h-full object-cover rounded-md object-top'
            src="https://5.imimg.com/data5/SELLER/Default/2025/7/527970681/XT/FK/YO/247603643/whatsapp-image-2025-07-15-at-15-17-34-1000x1000.jpeg" alt="" />
        </div>
        <div className='col-span-4 row-span-6 text-white'>
            <img className='w-full h-full object-cover rounded-md object-top'
            src="https://pbs.twimg.com/media/G4qY0RJWIAAIaPM?format=jpg&name=small" alt="" />
        </div>
        <div className='col-span-2 row-span-6 text-white'>
            <img className='w-full h-full object-cover rounded-md object-top'
             src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13837166/2021/8/19/04e40e02-4c56-4705-94d0-f444b29973aa1629373611707-House-of-Pataudi-Women-Maroon-Embellished-Handcrafted-Wedges-1.jpg" alt="" />
        </div>
    </div>
  )
}

export default CategoryGrid