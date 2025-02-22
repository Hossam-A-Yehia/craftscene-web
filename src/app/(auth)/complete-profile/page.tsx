import CompleteProfile from "@/components/pages/CompleteProfile/CompleteProfile";
import { completeProfileMetadata } from "@/config/metadata";
import React from "react";

export const metadata = completeProfileMetadata;

const page = () => {
  return <CompleteProfile />;
};

export default page;
