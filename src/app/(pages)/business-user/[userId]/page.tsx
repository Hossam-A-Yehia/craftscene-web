import { businessProfile } from "@/config/metadata";
import React from "react";
import Profile from "@/components/pages/Profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = businessProfile;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ userId: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { userId } = await params;
  const { from } = await searchParams;

  return <Profile userId={userId} from={from} />;
}
