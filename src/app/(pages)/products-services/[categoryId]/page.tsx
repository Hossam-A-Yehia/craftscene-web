import ProductsServices from "@/components/pages/ProductsServices/ProductsServices";
import { businessProfile } from "@/config/metadata";
import React from "react";
export const metadata = businessProfile;
export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const categoryId = (await params).categoryId;
  return (
    <>
      <ProductsServices categoryId={categoryId} />
    </>
  );
}
