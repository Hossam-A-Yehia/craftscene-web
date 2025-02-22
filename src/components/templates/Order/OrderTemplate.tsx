"use client";
import React from "react";
import { t } from "i18next";
import {
  useFetchOrderForCustomer,
  useMutateCompletedOrder,
  useMutateDeclinedOrder,
} from "@/hooks/useOrders";
import { CartItems } from "@/components/organisms/Order/Customer/CartItems/CartItems";
import OrderStatus from "@/components/organisms/Order/Customer/OrderStatus/OrderStatus";
import DeliveryAddress from "@/components/organisms/Order/Customer/DeliveryAddress/DeliveryAddress";
import PaymentSummary from "@/components/organisms/Order/Customer/PaymentSummary/PaymentSummary";
import Button from "@/components/atoms/Button/Button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type OrderTemplateProps = {
  orderId: string;
};

const OrderTemplate: React.FC<OrderTemplateProps> = ({ orderId }) => {
  const queryClient = useQueryClient();

  const { data: order, isLoading } = useFetchOrderForCustomer(orderId);
  const { mutateAsync: complateAsync, isPending: isPendingComplated } =
    useMutateCompletedOrder();
  const { mutateAsync: declineAsync, isPending: isPendingDeclined } =
    useMutateDeclinedOrder();

  const handleComplatedOrder = () => {
    complateAsync(orderId)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["customer-order-details"] });
        toast.info(t("order.order_details.accept_massage"));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleDeclinedOrder = () => {
    declineAsync(orderId)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["customer-order-details"] });
        toast.info(t("order.order_details.decline_massage"));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const PARTIALY_ACCEPTED = 2;
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-2xl font-bold text-gray-900 mb-8"
          data-testid="title"
        >
          {t("order.order_details.title")}
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1" data-testid="cart-items">
            <CartItems order={order} isLoading={isLoading} />
          </div>
          <div className="w-96">
            <OrderStatus status={order?.order?.status} />
            <DeliveryAddress deliveryAddress={order?.delivery_address} />
            <PaymentSummary
              deliveryDate={order?.order.delivery_date}
              shipping={order?.order.shipping}
              totalPrice={order?.order.total_price}
            />
          </div>
        </div>
        {order?.order.status === PARTIALY_ACCEPTED && (
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-1/4">
              <Button
                disabled={isPendingComplated}
                onClick={handleComplatedOrder}
                variant="main"
                dataTestid="accept-button"
              >
                {t("order.order_details.accept")}
              </Button>
            </div>
            <div className="w-1/4">
              <Button
                disabled={isPendingDeclined}
                onClick={handleDeclinedOrder}
                variant="outlineMain"
                dataTestid="decline-button"
              >
                {t("order.order_details.decline")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTemplate;
