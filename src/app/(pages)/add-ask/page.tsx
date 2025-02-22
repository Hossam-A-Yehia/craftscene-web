import AddAskPage from "@/components/pages/AddAskPage/AddAskPage";
import { asks } from "@/config/metadata";
import React from "react";
export const metadata = asks;
export default function Page() {
  return <AddAskPage />;
}
