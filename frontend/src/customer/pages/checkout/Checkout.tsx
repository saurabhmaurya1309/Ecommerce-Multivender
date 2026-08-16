import { Box, Button, FormControlLabel, Modal, Radio, RadioGroup, } from "@mui/material";
import React, { useEffect, useState } from "react";
import PricingCard from "../Cart/PricingCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import AddressCard from "../../components/address/AddressCard";
import AddressForm from "../../components/address/AddressForm";
import { deleteAddress, fetchUserProfile, } from "../../../State/AuthSlice";
import type { CustomerAddress } from "../../../types/UserTypes";
import { toast } from "react-toastify";
import { createOrder } from "../../../State/customer/orderSlice";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
        xs: "95%",
        sm: 500,
    },
    maxHeight: "90vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const paymentGatewayList = [
    {
        value: "RAZORPAY",
        label: "",
        image: "https://razorpay.com/newsroom-content/uploads/2020/12/output-onlinepngtools-1-1.png",
    },
    {
        value: "STRIPE",
        label: "",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png",
    },
];

const Checkout = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [paymentGateway, setPaymentGateway] = useState("RAZORPAY");
    const [selectedAddress, setSelectedAddress] = useState<CustomerAddress | null>(null);
    const [editingAddress, setEditingAddress] = useState<CustomerAddress | null>(null);
    const { cart } = useAppSelector((state) => state.cart);
    const {loading: orderLoading } = useAppSelector((state) => state.order);
    const { user, loading } = useAppSelector((state) => state.auth);
    /* =========================
       FETCH USER PROFILE
    ========================= */
    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    /* =========================
       MODAL
    ========================= */
    const handleOpenAddAddress = () => {
        setEditingAddress(null);
        setOpen(true);

    };

    const handleOpenEditAddress = (address: CustomerAddress) => {
        setEditingAddress(address);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingAddress(null);

    };

    /* =========================
       ADDRESS SUCCESS
    ========================= */

    const handleAddressSuccess = async () => {
        handleClose();
        await dispatch(fetchUserProfile());

    };

    /* =========================
       DELETE ADDRESS
    ========================= */

    const handleDeleteAddress = async (addressId: number) => {
        try {
            await dispatch(deleteAddress(addressId)).unwrap();

            // If deleted address was selected,
            // clear selection.
            if (selectedAddress?.id === addressId) {
                setSelectedAddress(null);
            }
            toast.success("Address deleted successfully!");

        } catch (error) {

            console.error("Failed to delete address:", error);
            toast.error("Failed to delete address");

        }

    };

    /* =========================
       PAYMENT CHANGE
    ========================= */

    const handlePaymentChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setPaymentGateway(
            e.target.value
        );

    };

    /* =========================
       SELECT ADDRESS
    ========================= */

    const handleAddressSelect = (address: CustomerAddress) => {
        setSelectedAddress(address);
    };

    /* =========================
       CHECKOUT
    ========================= */
    const handleCheckout = async () => {

        if (!selectedAddress) {

            toast.error(
                "Please select a delivery address"
            );

            return;
        }

        const jwt = localStorage.getItem("jwt");

        if (!jwt) {

            toast.error(
                "Please login before placing an order"
            );

            return;
        }

        try {

            const result = await dispatch(
                createOrder({ address: selectedAddress, jwt, paymentGateway, })
            ).unwrap();

            console.log(
                "Order Created Successfully:",
                result
            );

            if (result?.payment_link_url) {

                window.location.href =
                    result.payment_link_url;

                return;
            }

            toast.error(
                "Payment link was not generated"
            );

        } catch (error: any) {

            console.error(
                "Checkout Error:",
                error
            );

            toast.error(
                error ||
                "Failed to create order"
            );
        }
    };

    return (
        <>
            <div className="pt-10 px-5 sm:px-10 md:px-20 lg:px-32 xl:px-48 min-h-screen">

                <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">

                    {/* =================================================
                        LEFT SECTION
                    ================================================= */}

                    <div className="space-y-5 col-span-2">

                        <div className="flex justify-between items-center">

                            <h1 className="font-semibold text-xl">
                                Select Address
                            </h1>

                            <Button variant="outlined" onClick={handleOpenAddAddress} >
                                + Add New Address
                            </Button>

                        </div>

                        <div className="text-xs font-medium space-y-5">

                            <p> Saved Address </p>

                            {/* =========================
                                SAVED ADDRESSES
                            ========================= */}

                            {loading ? (

                                <div className="border rounded-md p-5 text-center">
                                    Loading addresses...
                                </div>

                            ) : user?.addresses &&
                                user.addresses.length > 0 ? (

                                <div className="flex flex-col gap-3">

                                    {user.addresses.map(
                                        (address) => (

                                            <div
                                                key={address.id}
                                                onClick={() =>
                                                    handleAddressSelect(
                                                        address
                                                    )
                                                }
                                                className={`
                                                    cursor-pointer
                                                    rounded-md
                                                    transition
                                                    ${selectedAddress?.id ===
                                                        address.id
                                                        ? "border-2 border-teal-600 bg-teal-50"
                                                        : "border border-gray-300"
                                                    }
                                                `}
                                            >

                                                <div className="flex items-start gap-3 p-3">

                                                    <Radio
                                                        checked={
                                                            selectedAddress?.id ===
                                                            address.id
                                                        }
                                                        onChange={() =>
                                                            handleAddressSelect(
                                                                address
                                                            )
                                                        }
                                                    />

                                                    <div className="flex-1">

                                                        <AddressCard
                                                            address={
                                                                address
                                                            }
                                                            onEdit={
                                                                handleOpenEditAddress
                                                            }
                                                            onDelete={
                                                                handleDeleteAddress
                                                            }
                                                        />

                                                    </div>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            ) : (

                                <div className="border rounded-md p-6 text-center">

                                    <p className="text-gray-500 mb-4">
                                        You don't have any saved address.
                                    </p>


                                </div>

                            )}

                        </div>


                    </div>


                    {/* =================================================
                        RIGHT SECTION
                    ================================================= */}

                    <div className="space-y-5">

                        {/* =========================
                            PAYMENT GATEWAY
                        ========================= */}

                        <div className="space-y-3 border p-5 rounded-md">

                            <h1 className="text-primary-color text-xl text-center">
                                Choose Payment Gateway
                            </h1>

                            <RadioGroup
                                row
                                className="flex gap-4"
                                onChange={
                                    handlePaymentChange
                                }
                                value={
                                    paymentGateway
                                }
                            >

                                {paymentGatewayList.map(
                                    (item) => (

                                        <div
                                            key={
                                                item.value
                                            }
                                            className={`
                                                flex items-center
                                                justify-center
                                                border p-3
                                                rounded
                                                w-[47%]
                                                cursor-pointer
                                                ${paymentGateway ===
                                                    item.value
                                                    ? "border-teal-600"
                                                    : ""
                                                }
                                            `}
                                        >

                                            <FormControlLabel
                                                value={
                                                    item.value
                                                }
                                                control={
                                                    <Radio />
                                                }
                                                label={
                                                    <img
                                                        src={
                                                            item.image
                                                        }
                                                        alt={
                                                            item.value
                                                        }
                                                        className="h-8"
                                                    />
                                                }
                                            />

                                        </div>

                                    )
                                )}

                            </RadioGroup>

                        </div>


                        {/* =========================
                            PRICE
                        ========================= */}

                        <div className="border rounded-md">

                            {cart && (
                                <PricingCard
                                    cart={cart}
                                />
                            )}

                            <div className="p-3">
                                <Button fullWidth variant="contained" sx={{ py: "11px", }}
                                    disabled={ !selectedAddress || orderLoading } onClick={handleCheckout} >
                                    {orderLoading ? "Creating Order..." : selectedAddress ? "Checkout Now" : "Select Address"}
                                </Button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                ADDRESS MODAL
            ================================================= */}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="address-modal"
            >

                <Box sx={style}>

                    <AddressForm
                        address={
                            editingAddress
                        }
                        onSuccess={
                            handleAddressSuccess
                        }
                    />

                </Box>

            </Modal>

        </>
    );
};

export default Checkout;