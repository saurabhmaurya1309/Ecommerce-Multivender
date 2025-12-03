import { Box, Button, FormControlLabel, Modal, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import AddressCard from './AddressCard'
import AddressForm from './AddressForm';
import PricingCard from '../Cart/PricingCard';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const paymentGatewayList = [
    {
        value: 'RAZORPAY',
        label: '',
        image: "https://razorpay.com/newsroom-content/uploads/2020/12/output-onlinepngtools-1-1.png"
    },
    {
        value: 'STRIPE',
        label: '',
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png"
    }
]

const Checkout = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [paymentGateway,setPaymentGateway]=useState('RAZORPAY')
    const handlePaymentChange =(e:any)=>{
        setPaymentGateway(e.target.value);

    }

    return (
        <>
            <div className='pt-10 px-5 sm:px-10 md:px-53 lg:px-57 min-h-screen '>
                <div className='space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9'>
                    <div className='space-y-5 col-span-2'>
                        <div className='flex justify-between items-center'>
                            <h1 className='font-semibold'>Select Address</h1>
                            <Button onClick={handleOpen}>
                                + Add New Address
                            </Button>

                        </div>
                        <div className='text-xs font-medium space-y-5'>
                            <p>Saved Address</p>
                            <div className='flex flex-col gap-2'>
                                {[1, 1, 1].map((item, index) => (
                                    <AddressCard />
                                ))}
                            </div>

                        </div>
                        <div className='py-4 px-5 rounded-md border'>
                            <Button onClick={handleOpen}>
                                + Add New Address
                            </Button>
                        </div>

                    </div>
                    <div>
                        <div className='space-y-3 border p-5 rounded-md'>
                            <h1 className='text-primary-color text-xl text-center'>Choose Payment Getway</h1>
                                <RadioGroup
                                    row
                                    className="flex gap-4"
                                    onChange={handlePaymentChange}
                                    value={paymentGateway}
                                >
                                    {paymentGatewayList.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-center border p-3 rounded w-[47%]"
                                        >
                                            <FormControlLabel
                                                value={item.value}
                                                control={<Radio />}
                                                label={<img src={item.image} alt={item.value} className="h-8" />}
                                            />
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        <div className='border rounded-md'>
                            
                            <PricingCard />
                            <div className='py-2'>
                                <Button fullWidth variant='contained' sx={{ py: "11px" }} >
                                    Checkout Now

                                </Button>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddressForm />
                </Box>
            </Modal>
        </>
    )
}

export default Checkout
