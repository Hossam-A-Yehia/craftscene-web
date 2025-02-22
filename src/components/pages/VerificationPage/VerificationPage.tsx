"use client";
import React from "react";
import AuthPage from "@/components/templates/AuthPage/AuthPage";
import VerificationForm from "@/components/organisms/VerificationForm/VerificationForm";

const VerificationPage: React.FC = () => {
  return <AuthPage FormComponent={VerificationForm} />;
};

export default VerificationPage;
