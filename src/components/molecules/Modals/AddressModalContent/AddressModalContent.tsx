import React from "react";
import Button from "@/components/atoms/Button/Button";
import { Address } from "@/types/Address";
import Link from "next/link";
import { t } from "i18next";

type ModalContentProps = {
  addresses: Address[];
  onConfirm: () => void;
  onCancel: () => void;
  defaultAddress: Address;
  setSelectedAddressId: (id: number | null) => void;
  selectedAddressId: number | null;
  userId: string;
};

const AddressModalContent = ({
  addresses,
  onConfirm,
  onCancel,
  setSelectedAddressId,
  selectedAddressId,
  userId,
}: ModalContentProps) => {
  const handleAddressClick = (id: number) => {
    setSelectedAddressId(id);
  };

  return (
    <div
      className="p-8 space-y-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto transition-all transform scale-100 hover:scale-105"
      data-testid="address-modal-content"
    >
      <h2
        className="text-xl font-semibold text-gray-800"
        data-testid="address-modal-title"
      >
        {t("order.checkout.address_list")}
      </h2>
      <div className="space-y-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address.id}
              data-testid={`address-card-${address.id}`}
              onClick={() => handleAddressClick(address.id)}
              className={`p-4 rounded-lg shadow-sm border ${
                selectedAddressId === address.id
                  ? "bg-blue-100 border-blue-500"
                  : "bg-gray-100 border-gray-300"
              } cursor-pointer`}
            >
              <p className="text-lg font-medium">{address.title}</p>
              <p className="text-gray-600">
                {address.street_address && `${address.street_address}, `}
                {address.city?.name_en || "Unknown City"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500" data-testid="no-addresses-message">
            {t("order.checkout.no_addresses_available")}
          </p>
        )}
      </div>

      <div className="flex justify-around space-x-4 mt-6">
        <Button
          variant="secondary"
          onClick={onCancel}
          dataTestid="cancel-button"
        >
          {t("order.checkout.cancel")}
        </Button>
        <Button
          dataTestid="confirm"
          variant="delete"
          onClick={onConfirm}
          disabled={!selectedAddressId}
        >
          {t("order.checkout.confirm")}
        </Button>
      </div>
      <Link href={`/add-address/${userId}`} className="mt-3 block">
        <Button variant="main" dataTestid="add-address-button">
          {t("order.checkout.add_another_address")}
        </Button>
      </Link>
    </div>
  );
};

export default AddressModalContent;
