import Text from "@/components/atoms/Text/Text";
import { ORDER_STATUS } from "@/constants/constants";
import { findLabelByValue } from "@/utils/generalUtils";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { FiArrowRight } from "react-icons/fi";

const OrderCard = ({
  id,
  status,
  total,
  supplierName,
  isIncomingOrders,
  clientName,
}: {
  id: number;
  status: number;
  total: number;
  supplierName: string;
  isIncomingOrders?: boolean;
  clientName?: string;
}) => {
  const { t } = useTranslation();
  const statusColor: { [key: string]: string } = {
    1: "text-orange-500",
    4: "text-green-500",
    3: "text-red-500",
    2: "text-blue-500",
  };
  const statusLabel = findLabelByValue(status, ORDER_STATUS);

  return (
    <div
      className="border rounded-lg p-4 shadow-sm bg-white mb-4 flex flex-col gap-4"
      data-testid="order-card"
    >
      <div className="flex items-center justify-between w-full">
        <Text className="text-gray-500 text-lg">
          {t("order.orders.order_id")}:
        </Text>
        <Text className="text-lg font-semibold" testId="order-id">
          {id}
        </Text>
      </div>
      <div className="flex items-center justify-between w-full">
        <Text className="text-gray-500 text-lg">
          {t("order.orders.total_price")}:
        </Text>
        <Text className="text-lg font-semibold" testId="order-total">
          {total} $
        </Text>
      </div>
      {!isIncomingOrders ? (
        <div className="flex items-center justify-between w-full">
          <Text className="text-gray-500 text-lg">
            {t("order.orders.supplier_name")}:
          </Text>
          <Text className="text-lg font-semibold" testId="supplier-name">
            {supplierName}
          </Text>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <Text className="text-gray-500 text-lg">
            {t("order.orders.client_name")}:
          </Text>
          <Text className="text-lg font-semibold" testId="client-name">
            {clientName}
          </Text>
        </div>
      )}
      <div className="flex items-center justify-between w-full">
        <Text className="text-gray-500 text-lg">
          {t("order.orders.order_status")}:
        </Text>
        <Text
          className={`text-lg font-semibold ${statusColor[status]} capitalize`}
          testId="order-status"
        >
          {statusLabel}
        </Text>
      </div>
      <Link
        href={isIncomingOrders ? `/incoming-orders/${id}` : `/orders/${id}`}
        className="mt-4 text-orange-500 font-medium flex items-center gap-1"
      >
        {t("order.orders.view_order_details")}
        <FiArrowRight data-testid="arrow-icon" />
      </Link>
    </div>
  );
};

export default OrderCard;
