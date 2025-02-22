import { forgetPasswordMetadata } from "@/config/metadata";
import ForgetPasswordPage from "@/components/pages/ForgetPassword/ForgetPassword";
import React from "react";
export const metadata = forgetPasswordMetadata;
export default async function Page() {
  return <ForgetPasswordPage />;
}
