"use client";
import Loader from "@/components/atoms/Loader/Loader";
import Text from "@/components/atoms/Text/Text";
import OrderGrid from "@/components/organisms/OrderGrid/OrderGrid";
import { ORDER_STATUS } from "@/constants/constants";
import { useFetchIncomingOrders, useFetchMyOrders } from "@/hooks/useOrders";
import { Order } from "@/types/Orders";
import { t } from "i18next";
import React, { useState } from "react";

const OrdersTemplate = ({
  isIncomingOrders,
}: {
  isIncomingOrders: boolean;
}) => {
  const [activeFilter, setActiveFilter] = useState(ORDER_STATUS[0].value);
  const { data: orders, isLoading: isOrdersLoading } = useFetchMyOrders(
    !isIncomingOrders
  );
  const { data: incomingOrders, isLoading: isIncomingOrdersLoading } =
    useFetchIncomingOrders(isIncomingOrders);

  const ordersToDisplay = isIncomingOrders ? incomingOrders : orders;
  const isLoading = isIncomingOrders
    ? isIncomingOrdersLoading
    : isOrdersLoading;

  const filteredOrders =
    activeFilter === 0
      ? ordersToDisplay
      : ordersToDisplay.filter((order: Order) => order.status === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 p-8" data-testid="orders-template">
      <div className="container">
        <Text className="text-2xl font-bold text-center mb-2" testId="title">
          {isIncomingOrders
            ? t("order.orders.incoming_orders")
            : t("order.orders.my_orders")}
        </Text>
        <Text testId="desc" className="text-gray-500 text-center mb-6">
          All the Lorem Ipsum generators on the Internet tend to repeat.
        </Text>
        <div
          className="flex justify-center gap-4 mb-6"
          data-testid="status-filters"
        >
          {ORDER_STATUS.map((status) => (
            <button
              key={status.value}
              className={`px-4 py-2 rounded-full font-medium ${
                activeFilter === status.value
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveFilter(status.value)}
              data-testid={`filter-${status.value}`}
            >
              {status.label}
            </button>
          ))}
        </div>
        {isLoading ? (
          <div data-testid="loader-container">
            <Loader />
          </div>
        ) : (
          <div data-testid="orders-container">
            <OrderGrid
              isLoading={isLoading}
              filteredOrders={filteredOrders}
              isIncomingOrders={isIncomingOrders}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersTemplate;
