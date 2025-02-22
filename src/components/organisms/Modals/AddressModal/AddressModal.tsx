import AddressModalContent from "@/components/molecules/Modals/AddressModalContent/AddressModalContent";
import { Address } from "@/types/Address";
import React, { useState } from "react";

type AddressModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (address: Address | null) => void;
  addresses: Address[];
  defaultAddress: Address;
  userId: string;
};

const AddressModal = ({
  isOpen,
  onCancel,
  onConfirm,
  addresses,
  defaultAddress,
  userId,
}: AddressModalProps) => {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    defaultAddress?.id
  );

  const handleConfirm = () => {
    const selectedAddress =
      addresses.find((addr) => addr.id === selectedAddressId) || null;
    onConfirm(selectedAddress);
  };

  return (
    <>
      {isOpen && (
        <div
          data-testid="address-modal-overlay"
          className="fixed top-0 left-0 w-full bg-gray-500 bg-opacity-50 flex justify-center items-center min-h-screen"
          style={{ margin: "0" }}
        >
          <div
            data-testid="address-modal-container"
            className="w-full max-w-lg"
          >
            <AddressModalContent
              data-testid="address-modal-content"
              userId={userId}
              defaultAddress={defaultAddress}
              addresses={addresses}
              onConfirm={handleConfirm}
              onCancel={onCancel}
              selectedAddressId={selectedAddressId}
              setSelectedAddressId={setSelectedAddressId}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddressModal;
