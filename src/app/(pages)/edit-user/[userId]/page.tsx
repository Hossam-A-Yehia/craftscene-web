import EditUserPage from "@/components/pages/EditUserPage/EditUserPage";
import { editUser } from "@/config/metadata";
import React from "react";
export const metadata = editUser;
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return <EditUserPage userId={userId} />;
}
