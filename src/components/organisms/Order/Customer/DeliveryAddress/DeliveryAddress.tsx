import Text from "@/components/atoms/Text/Text";
import React from "react";
import { t } from "i18next";
import { useLanguage } from "@/hooks/useLanguage";
interface DeliveryAddressProps {
  deliveryAddress: {
    street_address: string;
    city: {
      name_en: string;
      [key: `name_${string}`]: string | undefined;
    };
    country: {
      name_en: string;
      [key: `name_${string}`]: string | undefined;
    };
  };
}

export default function DeliveryAddress({
  deliveryAddress,
}: DeliveryAddressProps) {
  const lang = useLanguage();
  return (
    <div
      data-testid="delivery-address-container"
      className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4 mt-5"
    >
      <div
        data-testid="delivery-title"
        className="text-lg font-medium text-black"
      >
        {t("order.order_details.shipping_address")}
      </div>
      <div
        data-testid="address-display"
        className="flex items-center justify-between bg-gray-100 p-2 rounded-md gap-3"
      >
        <Text
          testId="address-text"
          className="text-gray-700 text-md font-semibold"
        >
          {deliveryAddress?.street_address || ""}
        </Text>
        <Text
          testId="address-text"
          className="text-gray-700 text-md font-semibold"
        >
          {deliveryAddress?.country?.[`name_${lang}`] ||
            deliveryAddress?.country?.name_en ||
            ""}
          ,{" "}
          {deliveryAddress?.city?.[`name_${lang}`] ||
            deliveryAddress?.city?.name_en ||
            ""}
        </Text>
      </div>
    </div>
  );
}
