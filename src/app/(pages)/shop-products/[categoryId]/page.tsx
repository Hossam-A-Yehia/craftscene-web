import { businessProfile } from "@/config/metadata";
import React from "react";
import ProductsCategories from "@/components/pages/ProductsCategories/ProductsCategories";
export const metadata = businessProfile;
export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const categoryId = (await params).categoryId;
  return (
    <>
      <ProductsCategories categoryId={categoryId} />
    </>
  );
}
