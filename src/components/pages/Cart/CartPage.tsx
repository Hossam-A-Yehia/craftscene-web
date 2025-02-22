import CartTemplate from "@/components/templates/Cart/CartTemplate";
import React from "react";

export default function CartPage({ userId }: { userId: string }) {
  return <CartTemplate userId={userId} />;
}
