"use client";
import React from "react";
import AuthPage from "@/components/templates/AuthPage/AuthPage";
import ResgisterForm from "@/components/organisms/ResgisterForm/ResgisterForm";

const ResgisterPage: React.FC = () => {
  return <AuthPage FormComponent={ResgisterForm} />;
};

export default ResgisterPage;
