"use client";
import React, { useState, useEffect, useCallback } from "react";
import { t } from "i18next";
import {
  useFetchOrderForSupplier,
  useMutateDeclinedOrder,
} from "@/hooks/useOrders";
import { CartItems } from "@/components/organisms/Order/Supplier/CartItems/CartItems";
import ClientInfo from "@/components/organisms/Order/Supplier/ClientInfo/ClientInfo";
import OrderSummary from "@/components/organisms/Order/Supplier/OrderSummary/OrderSummary";
import { useQueryClient } from "@tanstack/react-query";
import Button from "@/components/atoms/Button/Button";
import AcceptOrderModal from "@/components/organisms/Modals/AcceptOrderModal/AcceptOrderModal";
import OrderStatus from "@/components/organisms/Order/Customer/OrderStatus/OrderStatus";
import { toast } from "react-toastify";

type IncomingOrderTemplateProps = {
  orderId: string;
};

const IncomingOrderTemplate: React.FC<IncomingOrderTemplateProps> = ({
  orderId,
}) => {
  const { mutateAsync: declineAsync, isPending: isPendingDeclined } =
    useMutateDeclinedOrder();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggle = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);
  const { data: order, isLoading } = useFetchOrderForSupplier(orderId);

  const [checkedProducts, setCheckedProducts] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (order?.products) {
      const initialCheckedProducts = order.products.reduce(
        (
          acc: { [x: string]: boolean },
          product: { order_product_id: string | number }
        ) => {
          acc[product.order_product_id] = true;
          return acc;
        },
        {} as { [key: string]: boolean }
      );
      setCheckedProducts(initialCheckedProducts);
    }
  }, [order]);

  const handleCheckboxChange = (productId: number) => {
    setCheckedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleCheckAll = () => {
    if (order?.products) {
      const allChecked =
        Object.keys(checkedProducts).length === order.products.length &&
        Object.values(checkedProducts).every(Boolean);
      if (allChecked) {
        setCheckedProducts({});
      } else {
        const newCheckedProducts = order.products.reduce(
          (
            acc: { [x: string]: boolean },
            product: { order_product_id: string | number }
          ) => {
            acc[product.order_product_id] = true;
            return acc;
          },
          {} as { [key: string]: boolean }
        );
        setCheckedProducts(newCheckedProducts);
      }
    }
  };
  const availableProducts = Object.entries(checkedProducts)
    .filter(([, isChecked]) => isChecked)
    .map(([id]) => Number(id));

  const handleDeclinedOrder = () => {
    declineAsync(orderId)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["supplier-order-details"] });
        toast.info(t("order.order_details.decline_massage"));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const PENDING = 1;
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
            <CartItems
              order={order}
              isLoading={isLoading}
              checkedProducts={checkedProducts}
              onCheckboxChange={handleCheckboxChange}
              onCheckAll={handleCheckAll}
            />
          </div>
          <div className="w-96">
            <OrderStatus status={order?.order?.status} />
            <ClientInfo
              clinetName={order?.client?.username}
              orderId={order?.order.id}
              phone={order?.client.phone}
              email={order?.client.email}
              deliveryAddress={order?.delivery_address}
            />
            <OrderSummary
              shipping={order?.order.shipping}
              totalPrice={order?.order.total_price}
            />
          </div>
        </div>
        {order?.order.status === PENDING && (
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-1/4">
              <Button
                variant="main"
                dataTestid="accept-button"
                onClick={() => setIsModalOpen(true)}
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
      <AcceptOrderModal
        productsDetails={order?.products}
        selectedProductIds={availableProducts}
        isOpen={isModalOpen}
        orderId={order?.order.id}
        onCancel={toggle}
        onConfirm={() => {
          toggle();
        }}
      />
    </div>
  );
};

export default IncomingOrderTemplate;
