import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import {
  NotificationsNone,
  Storefront,
} from "@mui/icons-material";
import { useAppSelector } from "../../State/Store";
import { useNavigate } from "react-router-dom";

const SellerNavbar = () => {

  const seller = useAppSelector(
    (state) => state.seller.profile
  );
  const navigate = useNavigate();

  return (
    <Box
      className="bg-white sticky top-0 left-0 right-0 border-b"
      sx={{ zIndex: 10 }}
    >
      <div className="flex items-center justify-between px-5 lg:px-20 h-[70px]">

        {/* LOGO */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>

          <Storefront
            className="text-primary-color"
            sx={{ fontSize: 32 }}
          />

          <h1 className="logo text-lg md:text-2xl text-primary-color">
            Super Market
          </h1>

          <span className="text-gray-400">
            |
          </span>

          <Typography
            className="font-semibold"
            color="text.secondary"
          >
            Seller Center
          </Typography>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <IconButton>
            <NotificationsNone />
          </IconButton>

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/seller")}   >

            <Avatar
              sx={{
                width: 34,
                height: 34
              }}
            />

            <div className="hidden md:block">

              <p className="font-semibold text-sm">
                {seller?.sellerName || "Seller"}
              </p>

              <p className="text-xs text-gray-500">
                Seller Account
              </p>

            </div>

          </div>

        </div>

      </div>
    </Box>
  );
};

export default SellerNavbar;