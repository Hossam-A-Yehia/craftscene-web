import VerificationPage from "@/components/pages/VerificationPage/VerificationPage";
import { verification } from "@/config/metadata";
import React from "react";
export const metadata = verification;
export default async function Page() {
  return <VerificationPage />;
}
