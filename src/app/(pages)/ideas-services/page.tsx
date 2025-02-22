import IdeasServices from "@/components/pages/IdeasServices/IdeasServices";
import { services } from "@/config/metadata";
import { Categories } from "@/services/home/Home";
import React from "react";
export const metadata = services;
export default async function Page() {
  const categories = await Categories();

  return (
    <>
      <IdeasServices categoriesData={categories} />
    </>
  );
}
