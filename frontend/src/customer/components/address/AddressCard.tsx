import React from "react";
import {CustomerAddress} from "../../../types/UserTypes";

interface AddressCardProps {
  address: CustomerAddress;
  onEdit: (address: CustomerAddress) => void;
  onDelete: (addressId: number) => void;
}

const AddressCard = ({
  address,
  onEdit,
  onDelete,
}: AddressCardProps) => {

  return (
    <div className="p-5 border rounded-md flex justify-between">

      <div className="space-y-3">

        <h1 className="font-semibold">
          {address.name}
        </h1>

        <p className="w-[320px]">
          {address.address}, {address.locality},{" "}
          {address.city}, {address.state} -{" "}
          {address.pincode}
        </p>

        <p>
          <strong>Mobile:</strong> {address.mobile}
        </p>

      </div>

      <div className="flex gap-3 items-start">

        <button
          type="button"
          onClick={() => onEdit(address)}
          className="px-4 py-2 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => address.id !== undefined && onDelete(address.id)}
          className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default AddressCard;