import { Divider } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../State/Store";

const PricingCard = ({ cart }: { cart: any }) => {

  if (!cart) {
    return null;
  }

  const totalMrpPrice = cart.totalMrpPrice || 0;
  const totalSellingPrice = cart.totalSellingPrice || 0;

  const discount = totalMrpPrice - totalSellingPrice;

  return (
    <>
      <div className="space-y-4 p-5">

        {/* MRP */}
        <div className="flex justify-between items-center">
          <span>Price (items)</span>

          <span>
            ₹{totalMrpPrice.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Discount */}
        <div className="flex justify-between items-center">
          <span>Discount</span>

          <span className="text-green-600">
            - ₹{discount.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <span>Shipping</span>

          <span className="text-green-600">
            Free
          </span>
        </div>

        {/* Platform */}
        <div className="flex justify-between items-center">
          <span>Platform Fee</span>

          <span className="text-green-600">
            Free
          </span>
        </div>

      </div>

      <Divider />

      {/* TOTAL */}
      <div className="flex justify-between items-center p-5 text-primary-color font-bold text-lg">

        <span>Total</span>

        <span>
          ₹{totalSellingPrice.toLocaleString("en-IN")}
        </span>

      </div>
    </>
  );
};

export default PricingCard;