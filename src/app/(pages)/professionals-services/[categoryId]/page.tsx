import ProfessionalsServices from "@/components/pages/ProfessionalsServices/ProfessionalsServices";
import { professionals } from "@/config/metadata";
import React from "react";
export const metadata = professionals;
export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const categoryId = (await params).categoryId;
  return (
    <>
      <ProfessionalsServices categoryId={categoryId} />
    </>
  );
}
