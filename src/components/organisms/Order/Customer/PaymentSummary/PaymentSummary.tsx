import Text from "@/components/atoms/Text/Text";
import SummaryRow from "@/components/molecules/SummaryRow/SummaryRow";
import { t } from "i18next";
import React from "react";

export default function PaymentSummary({
  totalPrice,
  shipping,
  deliveryDate,
}: {
  totalPrice: number;
  shipping: number;
  deliveryDate?: number;
}) {
  return (
    <div
      className="w-full bg-white p-6 rounded-lg shadow-sm h-fit mt-5"
      data-testid="payment-summary"
    >
      <Text
        testId="order-summary-title"
        className="text-xl font-semibold text-gray-900 mb-6"
      >
        {t("order.order_details.order_Summary")}
      </Text>
      <div className="space-y-4">
        <SummaryRow
          testId="delivery-date-row"
          label={t("order.order_details.delivery_date")}
          value={deliveryDate ? String(deliveryDate) : "__"}
        />
        <SummaryRow
          testId="subtotal-row"
          label={t("order.order_details.subtotal")}
          value={String("$" + (totalPrice - shipping))}
        />
        <SummaryRow
          testId="shipping-row"
          label={t("order.order_details.shipping")}
          value={shipping ? String("$" + shipping) : "__"}
        />
        <div className="pt-4 border-t border-gray-200 font-bold">
          <SummaryRow
            testId="total-amount-row"
            label={t("order.order_details.total_price")}
            value={"$" + String(totalPrice)}
          />
        </div>
      </div>
    </div>
  );
}
