import CartPage from "@/components/pages/Cart/CartPage";
import { cart } from "@/config/metadata";
import React from "react";
export const metadata = cart;
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return <CartPage userId={userId} />;
}
