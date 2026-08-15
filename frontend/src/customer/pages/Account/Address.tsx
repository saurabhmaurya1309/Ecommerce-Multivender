import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddressCard from "../../components/address/AddressCard";
import AddressForm from "../../components/address/AddressForm";
import  { CustomerAddress} from "../../../types/UserTypes";
import { useAppDispatch } from "../../../State/Store";
import { deleteAddress } from "../../../State/AuthSlice";
import { toast } from "react-toastify";

const Address = () => {
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<CustomerAddress | null>(null);

  const user = useSelector((state: any) => state.auth.user);
  const addresses = user?.addresses || [];

  // Add new address
  const handleAddAddress = () => {
    setSelectedAddress(null);
    setShowForm(true);
  };

  // Edit existing address
  const handleEditAddress = (address: CustomerAddress) => {
    setSelectedAddress(address);
    setShowForm(true);
  };

  // Delete address
  const handleDeleteAddress = async (addressId: number) => {

  const confirmed = window.confirm(
    "Are you sure you want to delete this address?"
  );

  if (!confirmed) {
    return;
  }

  try {

    await dispatch(
      deleteAddress(addressId)
    ).unwrap();

    toast.success("Address deleted successfully!");

  } catch (error) {

    console.error(
      "Failed to delete address:",
      error
    );
  }
};

  // Close form
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedAddress(null);
  };

  return (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          My Addresses
        </h2>

        {!showForm && (
          <button
            type="button"
            onClick={handleAddAddress}
            className="bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition"
          >
            + Add New Address
          </button>
        )}
      </div>

      {/* Address Form */}
      {showForm && (
        <div className="border rounded-md p-5">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-xl font-semibold">
              {selectedAddress
                ? "Edit Address"
                : "Add New Address"}
            </h2>

            <button
              type="button"
              onClick={handleCloseForm}
              className="text-gray-500 hover:text-black"
            >
              Cancel
            </button>

          </div>

          <AddressForm
            address={selectedAddress}
            onSuccess={handleCloseForm}
          />

        </div>
      )}

      {/* Saved Addresses */}
      {!showForm && (
        <>
          {addresses.length > 0 ? (

            addresses.map((address: CustomerAddress) => (
              <AddressCard
                key={address.id}
                address={address}
                onEdit={handleEditAddress}
                onDelete={handleDeleteAddress}
              />
            ))

          ) : (

            <div className="p-5 border rounded-md">

              <p className="text-gray-500">
                No saved addresses found.
              </p>

              <button
                type="button"
                onClick={handleAddAddress}
                className="mt-4 bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition"
              >
                + Add Your First Address
              </button>

            </div>

          )}
        </>
      )}

    </div>
  );
};

export default Address;