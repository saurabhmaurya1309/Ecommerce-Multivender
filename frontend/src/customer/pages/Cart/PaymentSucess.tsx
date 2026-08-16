import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../State/Store";
import { paymentSuccess } from "../../../State/customer/orderSlice";
import { toast } from "react-toastify";

const PaymentSucess = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const [verifying, setVerifying] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {

        const verifyPayment = async () => {

            const query = new URLSearchParams(location.search);

            const paymentId =
                query.get("razorpay_payment_id");

            const paymentLinkId =
                query.get("razorpay_payment_link_id");

            const paymentLinkReferenceId =
                query.get("razorpay_payment_link_reference_id");

            const paymentLinkStatus =
                query.get("razorpay_payment_link_status");

            const signature =
                query.get("razorpay_signature");

            console.log("Razorpay Callback Data:");
            console.log("paymentId:", paymentId);
            console.log("paymentLinkId:", paymentLinkId);
            console.log(
                "paymentLinkReferenceId:",
                paymentLinkReferenceId
            );
            console.log(
                "paymentLinkStatus:",
                paymentLinkStatus
            );
            console.log("signature:", signature);

            if (
                !paymentId ||
                !paymentLinkId ||
                !paymentLinkReferenceId ||
                !paymentLinkStatus ||
                !signature
            ) {

                console.error(
                    "Required Razorpay parameters are missing"
                );

                toast.error(
                    "Payment information is missing"
                );

                setVerifying(false);
                return;
            }

            const jwt =
                localStorage.getItem("jwt");

            if (!jwt) {

                toast.error(
                    "Please login again"
                );

                setVerifying(false);
                return;
            }

            try {

                await dispatch(
                    paymentSuccess({
                        paymentId,
                        paymentLinkId,
                        paymentLinkReferenceId,
                        paymentLinkStatus,
                        signature,
                        jwt,
                    })
                ).unwrap();

                console.log(
                    "Payment verified successfully"
                );

                setSuccess(true);

                toast.success(
                    "Payment successful"
                );

            } catch (error) {

                console.error(
                    "Payment verification failed:",
                    error
                );

                toast.error(
                    "Payment verification failed"
                );

            } finally {

                setVerifying(false);
            }
        };

        verifyPayment();

    }, [dispatch, location.search]);


    if (verifying) {

        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh"
                }}
            >
                <h2>
                    Verifying your payment...
                </h2>
            </div>
        );
    }


    if (!success) {

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh"
                }}
            >
                <h2>
                    Payment verification failed
                </h2>

                <Button
                    variant="contained"
                    onClick={() => navigate("/cart")}
                >
                    Go to Cart
                </Button>
            </div>
        );
    }


    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh"
            }}
        >

            <h1 style={{ color: "green" }}>
                Payment Successful
            </h1>

            <p>
                Your order has been placed successfully.
            </p>

            <p>
                Thank you for shopping with us!
            </p>

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/account/orders")}
            >
                View Orders
            </Button>

        </div>
    );
};

export default PaymentSucess;