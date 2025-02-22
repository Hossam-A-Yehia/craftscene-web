"use client";

import React from "react";
import PaymentSummary from "@/components/organisms/Cart/PaymentSummary/PaymentSummary";
import { useFetchCart } from "@/hooks/useOrders";
import { CartItems } from "@/components/organisms/Cart/CartItems/CartItems";
import { t } from "i18next";
type Product = {
  quantity?: number;
  variant?: {
    price?: number;
  };
};

type Payload = Record<string, Product[]>;

export default function Cart({ userId }: { userId: string }) {
  const { data: products, isLoading } = useFetchCart(userId);

  const subTotal = Object.entries((products?.payload || {}) as Payload).reduce(
    (acc, [, items]) => {
      items.forEach((item) => {
        const quantity = item.quantity ?? 0;
        const price = item.variant?.price ?? 0;
        acc += quantity * price;
      });
      return acc;
    },
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-2xl font-bold text-gray-900 mb-8"
          data-testid="title"
        >
          {t("order.cart.shopping_cart")}
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <CartItems
              products={products?.payload}
              isLoading={isLoading}
              isCheckout={false}
            />
          </div>
          <div className="w-96">
            <PaymentSummary subTotal={subTotal} userId={userId} shipping="" />
          </div>
        </div>
      </div>
    </div>
  );
}
