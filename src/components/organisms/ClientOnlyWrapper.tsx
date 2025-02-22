"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import "@/il8n/index";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/UserContext";

const queryClient = new QueryClient();

export default function ClientOnlyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <div className={i18n.language === "ar" ? "dir-rtl" : "dir-ltr"}>
            <ToastContainer />
            {children}
          </div>
        </UserProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
