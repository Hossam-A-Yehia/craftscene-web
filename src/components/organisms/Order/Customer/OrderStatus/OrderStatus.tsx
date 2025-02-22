import Text from "@/components/atoms/Text/Text";
import { ORDER_STATUS } from "@/constants/constants";
import { findLabelByValue } from "@/utils/generalUtils";
import React from "react";

export default function OrderStatus({ status }: { status: number }) {
  const statusLabel = findLabelByValue(status, ORDER_STATUS);

  return (
    <div
      className="w-full bg-white p-6 rounded-lg shadow-sm h-fit"
      data-testid="order-status"
    >
      <div
        data-testid="status"
        className="space-y-4 text-lg font-semibold text-primary-hover text-center border border-primary-hover p-2 rounded-md"
      >
        <Text>{statusLabel}</Text>
      </div>
    </div>
  );
}
