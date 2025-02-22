import { professionals } from "@/config/metadata";
import React from "react";
import ProfessionalsCategories from "@/components/pages/ProfessionalsCategories/ProfessionalsCategories";
export const metadata = professionals;
export default async function Page({
  params,
}: {
  params: Promise<{ parentCategoryId: string }>;
}) {
  const parentCategoryId = (await params).parentCategoryId;
  return (
    <>
      <ProfessionalsCategories parentCategoryId={parentCategoryId} />
    </>
  );
}
