import Loader from "@/components/atoms/Loader/Loader";
import Text from "@/components/atoms/Text/Text";
import { t } from "i18next";
import React from "react";

export default function PhoneNumber({
  phone,
  isLoading,
}: {
  phone: string;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div
      data-testid="phone-container"
      className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4 mt-8"
    >
      <div className="text-lg font-medium text-black">
        {t("order.checkout.phone_number")}
      </div>
      <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md gap-3">
        <Text className="text-gray-700 text-lg">{phone}</Text>
      </div>
    </div>
  );
}
