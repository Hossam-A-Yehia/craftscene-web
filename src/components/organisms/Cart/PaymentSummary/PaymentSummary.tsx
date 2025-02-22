import Button from "@/components/atoms/Button/Button";
import Text from "@/components/atoms/Text/Text";
import SummaryRow from "@/components/molecules/SummaryRow/SummaryRow";
import { t } from "i18next";
import Link from "next/link";
import React from "react";

export default function PaymentSummary({
  subTotal,
  userId,
  isCheckout,
  shipping,
}: {
  subTotal: number;
  userId: string;
  isCheckout?: boolean;
  shipping?: string;
}) {
  return (
    <div
      className="w-full bg-white p-6 rounded-lg shadow-sm h-fit"
      data-testid="payment-summary"
    >
      <Text
        testId="order-summary-title"
        className="text-xl font-semibold text-gray-900 mb-6"
      >
        {t("order.cart.order_summary")}
      </Text>
      <div className="space-y-4 mb-6">
        <SummaryRow
          label={t("order.cart.subtotal")}
          value={"$" + String(subTotal)}
          testId="subtotal-row"
        />
        <SummaryRow
          label={t("order.cart.shipping")}
          value={shipping ? shipping : "__"}
          valueClass="text-green-600"
          testId="shipping-row"
        />
        <div className="pt-4 border-t border-gray-200">
          <SummaryRow
            label={t("order.cart.total_amount")}
            value={"$" + String(subTotal + Number(shipping))}
            valueClass="text-xl text-gray-900 font-semibold"
            testId="total-amount-row"
          />
        </div>
      </div>
      {!isCheckout && (
        <Link href={`/checkout/${userId}`}>
          <Button
            dataTestid="checkout-button"
            variant="main"
            disabled={subTotal === 0}
          >
            {t("order.cart.proceed_to_checkout")}
          </Button>
        </Link>
      )}
    </div>
  );
}
