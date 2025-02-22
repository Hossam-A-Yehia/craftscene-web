import { businessProfile } from "@/config/metadata";
import React from "react";
import Profile from "@/components/pages/Profile/Profile";
export const metadata = businessProfile;
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return (
    <>
      <Profile userId={userId} />
    </>
  );
}
