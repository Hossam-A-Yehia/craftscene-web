import { businessProfile } from "@/config/metadata";
import React from "react";
import Profile from "@/components/pages/Profile/Profile";

export const metadata = businessProfile;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ userId: string }>;
  searchParams: { from?: string };
}) {
  const userId = (await params).userId;
  const from = searchParams.from;

  return (
    <>
      <Profile userId={userId} from={from} />
    </>
  );
}
