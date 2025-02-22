import Text from "@/components/atoms/Text/Text";
import SummaryRow from "@/components/molecules/SummaryRow/SummaryRow";
import { t } from "i18next";
import React from "react";

export default function ClientInfo({
  clinetName,
  email,
  orderId,
  phone,
  deliveryAddress,
}: {
  clinetName: string;
  email: string;
  orderId?: number;
  phone: string;
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
}) {
  return (
    <div
      className="w-full bg-white p-6 rounded-lg shadow-sm h-fi mt-5"
      data-testid="payment-summary"
    >
      <Text
        testId="order-summary-title"
        className="text-xl font-semibold text-gray-900 mb-6"
      >
        {t("order.order_details.client_info")}
      </Text>
      <div className="space-y-4">
        <SummaryRow
          testId="order-id"
          label={t("order.order_details.order_id")}
          value={"#" + String(orderId)}
        />
        <SummaryRow
          testId="client-name"
          label={t("order.order_details.client_name")}
          value={String(clinetName)}
        />
        <SummaryRow
          testId="order-address"
          label={t("order.order_details.address")}
          value={
            deliveryAddress?.street_address
              ? String(deliveryAddress.street_address)
              : [
                  deliveryAddress?.country?.name_en || "",
                  deliveryAddress?.city?.name_en || "",
                ]
                  .filter(Boolean)
                  .join(", ")
          }
        />
        <SummaryRow
          testId="order-email"
          label={t("order.order_details.email")}
          value={email ? String(email) : "__"}
        />
        <SummaryRow
          testId="order-phone"
          label={t("order.order_details.phone")}
          value={phone ? String(phone) : "__"}
        />
      </div>
    </div>
  );
}
