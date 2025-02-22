import AddRfqPage from "@/components/pages/AddRfqPage/AddRfqPage";
import { RFQs } from "@/config/metadata";
import React from "react";
export const metadata = RFQs;
export default async function Page() {
  return <AddRfqPage />;
}
