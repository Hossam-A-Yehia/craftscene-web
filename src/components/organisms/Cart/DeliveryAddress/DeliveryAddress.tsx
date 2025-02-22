import Text from "@/components/atoms/Text/Text";
import { Address } from "@/types/Address";
import { FaEdit } from "react-icons/fa";
import AddressModal from "../../Modals/AddressModal/AddressModal";
import React, { useCallback, useState, useEffect } from "react";
import { t } from "i18next";
interface DeliveryAddressProps {
  addresses: Address[];
  userId: string;
  onAddressChange?: (address: Address) => void;
}

export default function DeliveryAddress({
  addresses,
  userId,
  onAddressChange,
}: DeliveryAddressProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const toggle = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const defaultAddress =
    selectedAddress ||
    addresses?.find((address) => address.is_default === 1) ||
    addresses?.[0];

  useEffect(() => {
    if (defaultAddress && onAddressChange) {
      onAddressChange(defaultAddress);
    }
  }, [defaultAddress, onAddressChange]);

  const handleChooseAddress = (address: Address | null) => {
    if (address) {
      setSelectedAddress(address);
    }
  };

  if (!addresses || addresses.length === 0) {
    return (
      <div
        data-testid="empty-address-container"
        className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4"
      >
        <div
          data-testid="delivery-title"
          className="text-lg font-medium text-black"
        >
          {t("order.checkout.delivery_address")}
        </div>
        <div data-testid="no-address-message" className="text-gray-500 text-sm">
          {t("order.checkout.no_addresses_available")}
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="delivery-address-container"
      className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4"
    >
      <div
        data-testid="delivery-title"
        className="text-lg font-medium text-black"
      >
        {t("order.checkout.delivery_address")}
      </div>
      <div
        data-testid="address-display"
        className="flex items-center justify-between bg-gray-100 p-2 rounded-md gap-3"
      >
        <Text
          data-testid="address-text"
          className="text-gray-700 text-sm font-semibold"
        >
          {defaultAddress?.title || ""}, {defaultAddress?.street_address || ""}
        </Text>
        <button
          data-testid="edit-address-button"
          onClick={() => setIsModalOpen(true)}
          className="text-orange-500 cursor-pointer text-2xl"
        >
          <FaEdit />
        </button>
      </div>
      <AddressModal
        userId={userId}
        addresses={addresses}
        isOpen={isModalOpen}
        onCancel={toggle}
        defaultAddress={defaultAddress}
        onConfirm={(address) => {
          handleChooseAddress(address);
          toggle();
        }}
      />
    </div>
  );
}
