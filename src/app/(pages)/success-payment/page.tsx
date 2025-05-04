import SuccessPaymentPage from "@/components/pages/SuccessPaymentPage/SuccessPaymentPage";
import { successPayment } from "@/config/metadata";
import React from "react";
export const metadata = successPayment;
export default function Page() {
  return <SuccessPaymentPage />;
}
