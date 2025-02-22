import CheckoutTemplate from "@/components/templates/Checkout/CheckoutTemplate";
import React from "react";

export default function CheckoutPage({ userId }: { userId: string }) {
  return <CheckoutTemplate userId={userId} />;
}
