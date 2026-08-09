import React from "react";

import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  CircularProgress,
} from "@mui/material";

import {
  PersonOutline,
  BusinessOutlined,
  LocationOnOutlined,
  VerifiedOutlined,
  AccountBalanceOutlined,
  PhoneOutlined,
  EmailOutlined,
  BadgeOutlined,
} from "@mui/icons-material";

import { useAppSelector } from "../../../State/Store";


const Profile = () => {

  const {
    profile: seller,
    loading,
    error,
  } = useAppSelector(
    (state) => state.seller
  );


  if (loading) {

    return (

      <div className="flex justify-center items-center min-h-[400px]">

        <CircularProgress />

      </div>

    );

  }


  if (error) {

    return (

      <div className="p-6">

        <h1 className="text-xl font-bold text-red-600">
          Unable to load seller profile
        </h1>

        <p className="text-gray-500 mt-2">
          Please try again later.
        </p>

      </div>

    );

  }


  if (!seller) {

    return (

      <div className="p-6">

        <h1 className="text-xl font-bold">
          Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Seller profile not available.
        </p>

      </div>

    );

  }


  const initials =
    seller.sellerName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "S";


  const getStatusColor = () => {

    switch (seller.accountStatus) {

      case "ACTIVE":
        return "success";

      case "SUSPENDED":
      case "DEACTIVATED":
        return "warning";

      case "BANNED":
      case "CLOSED":
        return "error";

      default:
        return "default";

    }

  };


  const maskAccountNumber = (
    accountNumber?: string
  ) => {

    if (!accountNumber) {
      return "Not provided";
    }

    if (accountNumber.length <= 4) {
      return accountNumber;
    }

    return `•••• •••• ${accountNumber.slice(-4)}`;

  };


  return (

    <div className="space-y-6">

      {/* =========================
          PAGE TITLE
      ========================== */}

      <div>

        <h1 className="text-2xl font-bold">
          Profile
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your seller account and business information.
        </p>

      </div>


      {/* =========================
          PROFILE HEADER
      ========================== */}

      <Paper
        elevation={0}
        className="border rounded-xl"
      >

        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">

          <div className="flex items-center gap-5">

            <Avatar
              sx={{
                width: 72,
                height: 72,
                fontSize: 24,
                bgcolor: "#009688",
              }}
            >

              {initials}

            </Avatar>


            <div>

              <h2 className="text-xl font-bold">

                {seller.sellerName || "Seller"}

              </h2>


              <div className="flex items-center gap-2 text-gray-500 mt-1">

                <EmailOutlined
                  sx={{ fontSize: 18 }}
                />

                <span>
                  {seller.email || "Email not available"}
                </span>

              </div>


              <div className="flex items-center gap-2 mt-3">

                <Chip
                  label={
                    seller.accountStatus
                      ?.replaceAll("_", " ") ||
                    "UNKNOWN"
                  }
                  color={getStatusColor() as any}
                  size="small"
                />


                {seller.emailVerified && (

                  <Chip
                    icon={
                      <VerifiedOutlined />
                    }
                    label="Email Verified"
                    color="success"
                    variant="outlined"
                    size="small"
                  />

                )}

              </div>

            </div>

          </div>


          <div className="text-left md:text-right">

            <p className="text-sm text-gray-500">
              Seller ID
            </p>

            <p className="font-semibold">
              #{seller.id ?? "N/A"}
            </p>

          </div>

        </div>

      </Paper>


      {/* =========================
          PERSONAL INFORMATION
      ========================== */}

      <Paper
        elevation={0}
        className="border rounded-xl"
      >

        <SectionHeader
          icon={<PersonOutline />}
          title="Personal Information"
        />


        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

          <InfoItem
            icon={<PersonOutline />}
            label="Seller Name"
            value={seller.sellerName}
          />


          <InfoItem
            icon={<EmailOutlined />}
            label="Email"
            value={seller.email}
          />


          <InfoItem
            icon={<PhoneOutlined />}
            label="Mobile"
            value={seller.mobile}
          />


          <InfoItem
            icon={<BadgeOutlined />}
            label="GSTIN"
            value={seller.GSTIN}
          />

        </div>

      </Paper>


      {/* =========================
          BUSINESS INFORMATION
      ========================== */}

      <Paper
        elevation={0}
        className="border rounded-xl"
      >

        <SectionHeader
          icon={<BusinessOutlined />}
          title="Business Information"
        />


        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

          <InfoItem
            label="Business Name"
            value={
              seller.businessDetails?.businessName
            }
          />


          <InfoItem
            label="Business Email"
            value={
              seller.businessDetails?.businessEmail
            }
          />


          <InfoItem
            label="Business Mobile"
            value={
              seller.businessDetails?.businessMobile
            }
          />


          <InfoItem
            label="Business Address"
            value={
              seller.businessDetails?.businessAddress
            }
          />

        </div>

      </Paper>


      {/* =========================
          PICKUP ADDRESS
      ========================== */}

      <Paper
        elevation={0}
        className="border rounded-xl"
      >

        <SectionHeader
          icon={<LocationOnOutlined />}
          title="Pickup Address"
        />


        <div className="p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <InfoItem
              label="Name"
              value={
                seller.pickupAddress?.name
              }
            />


            <InfoItem
              label="Mobile"
              value={
                seller.pickupAddress?.mobile
              }
            />


            <InfoItem
              label="Address"
              value={
                seller.pickupAddress?.address
              }
            />


            <InfoItem
              label="Locality"
              value={
                seller.pickupAddress?.locality
              }
            />


            <InfoItem
              label="City"
              value={
                seller.pickupAddress?.city
              }
            />


            <InfoItem
              label="State"
              value={
                seller.pickupAddress?.state
              }
            />


            <InfoItem
              label="Pincode"
              value={
                seller.pickupAddress?.pincode
              }
            />

          </div>

        </div>

      </Paper>


      {/* =========================
          BANK DETAILS
      ========================== */}

      <Paper
        elevation={0}
        className="border rounded-xl"
      >

        <SectionHeader
          icon={<AccountBalanceOutlined />}
          title="Bank Details"
        />


        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

          <InfoItem
            label="Account Holder"
            value={
              seller.bankDetails
                ?.accountHolderName
            }
          />


          <InfoItem
            label="Account Number"
            value={
              maskAccountNumber(
                seller.bankDetails?.accountNumber
              )
            }
          />


          <InfoItem
            label="IFSC Code"
            value={
              seller.bankDetails?.ifscCode
            }
          />

        </div>

      </Paper>


      {/* =========================
          ACCOUNT STATUS
      ========================== */}

      <Paper
        elevation={0}
        className="border rounded-xl"
      >

        <SectionHeader
          icon={<VerifiedOutlined />}
          title="Account Verification"
        />


        <div className="p-6 space-y-4">

          <StatusRow
            label="Email Verification"
            verified={seller.emailVerified}
          />


          <Divider />


          <div className="flex justify-between items-center">

            <span className="text-gray-600">
              Account Status
            </span>

            <Chip
              label={
                seller.accountStatus
                  ?.replaceAll("_", " ") ||
                "UNKNOWN"
              }
              color={getStatusColor() as any}
              size="small"
            />

          </div>

        </div>

      </Paper>

    </div>

  );

};


interface SectionHeaderProps {

  icon: React.ReactNode;

  title: string;

}


const SectionHeader = ({
  icon,
  title,
}: SectionHeaderProps) => (

  <div className="px-6 py-4 border-b flex items-center gap-3">

    <div className="text-teal-600">

      {icon}

    </div>

    <h2 className="font-semibold text-lg">

      {title}

    </h2>

  </div>

);


interface InfoItemProps {

  icon?: React.ReactNode;

  label: string;

  value?: string | number | null;

}


const InfoItem = ({
  icon,
  label,
  value,
}: InfoItemProps) => (

  <div>

    <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">

      {icon}

      {label}

    </p>

    <p className="font-medium text-gray-900 break-words">

      {value || "Not provided"}

    </p>

  </div>

);


interface StatusRowProps {

  label: string;

  verified?: boolean;

}


const StatusRow = ({
  label,
  verified,
}: StatusRowProps) => (

  <div className="flex justify-between items-center">

    <span className="text-gray-600">
      {label}
    </span>

    {verified ? (

      <Chip
        icon={<VerifiedOutlined />}
        label="Verified"
        color="success"
        size="small"
      />

    ) : (

      <Chip
        label="Not Verified"
        color="warning"
        size="small"
      />

    )}

  </div>

);


export default Profile;