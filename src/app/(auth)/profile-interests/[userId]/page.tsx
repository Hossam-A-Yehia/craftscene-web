import InterestsPage from "@/components/pages/Interests/InterestsPage";
import { interests } from "@/config/metadata";
import React from "react";
export const metadata = interests;
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return <InterestsPage userId={userId} />;
}
