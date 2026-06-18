import React from 'react'

const SimilarProductCard = () => {
    return (
        <div className='group px-1 relative'>
            <div className='card'

            >

                <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcROSEhAouPUStVBaBCqThefUt_W2MZMLpRGUi-D43-3ubIA8UPI3Wyu1gieRx8nEuKRqB9BCFNkEWNzq5j9B4AKSphn1OrfHSnMDFxoHyRMi_K1DpqrTMy1&usqp=CAc" alt="product_image" className='card-media object-top inset-0 transition-transform duration-1500'
                />

            </div>
            <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
                <div className='name'>
                    <h1>Niky</h1>
                    <p>Blue Shirt</p>
                </div>
                <div className='price flex items-center gap-3'>
                    <span className='font-sans text-gray-800'>₹ 400</span>
                    <span className='thin-line-through text-gray-400'>₹ 900</span>
                    <span className='text-primary-color font-semibold'>60%</span>
                </div>
            </div>
        </div>
    )
}

export default SimilarProductCard
