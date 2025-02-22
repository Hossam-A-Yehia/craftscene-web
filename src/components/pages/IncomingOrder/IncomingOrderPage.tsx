import IncomingOrderTemplate from "@/components/templates/IncomingOrder/IncomingOrderTemplate";
import React from "react";

export default async function IncomingOrderPage({
  orderId,
}: {
  orderId: string;
}) {
  return <IncomingOrderTemplate orderId={orderId} />;
}
