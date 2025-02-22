import OrderTemplate from "@/components/templates/Order/OrderTemplate";
import React from "react";

export default async function OrderPage({ orderId }: { orderId: string }) {
  return <OrderTemplate orderId={orderId} />;
}
