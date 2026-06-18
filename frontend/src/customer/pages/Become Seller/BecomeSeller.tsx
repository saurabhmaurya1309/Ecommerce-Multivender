import React, { useState } from 'react'
import SellerAccountForm from './SellerAccountForm';
import SellerLoginForm from './SellerLoginForm';
import { Button } from '@mui/material';
import SellerForgotPasswordForm from './SellerForgotPasswordForm';

const BecomeSeller = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const handleShowPage = () => {
        setIsLogin(!isLogin);
    }
    return (
        <div className='grid md:gap-10 grid-cols-3 min-h-screen'>
            <section className='lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md '>
                {
                    showForgotPassword ? (
                        <SellerForgotPasswordForm
                            switchToLogin={() => {
                                setShowForgotPassword(false);
                                setIsLogin(true);
                            }}
                        />
                    ) : isLogin ? (
                        <SellerLoginForm
                            openForgotPassword={() =>
                                setShowForgotPassword(true)
                            }
                        />
                    ) : (
                        <SellerAccountForm
                            switchToLogin={handleShowPage}
                        />
                    )
                }
                {
                    !showForgotPassword && (
                        <div className='mt-10 space-y-2'>
                            <h1 className='text-center text-sm font-medium'>
                                have account
                            </h1>

                            <Button
                                onClick={handleShowPage}
                                fullWidth
                                sx={{ py: "11px" }}
                                variant='outlined'
                            >
                                {isLogin ? "Register" : "Login"}
                            </Button>
                        </div>
                    )
                }
            </section>
            <section className='overflow-hidden md:flex items-center justify-center md:col-span-1 lg:col-span-2'>
                <div className='lg-w-[70%] px-5 space-y-10'>
                    <div className='space-y-2 font-bold text-center'>
                        <p className='text-2xl'> Join the Marketplace Revolution</p>
                        <p className='text-xl text-primary-color'>Boost your sales today</p>
                    </div>
                    <div className="relative w-full h-[500px] overflow-hidden">
                        <img
                            className="w-full h-full "
                            src='./banner.png'
                            alt=""
                        />
                    </div>


                </div>

            </section>

        </div>
    )
}

export default BecomeSeller
