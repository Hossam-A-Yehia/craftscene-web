import AskPage from "@/components/pages/Ask/AskPage";
import { ask } from "@/config/metadata";
import React from "react";
export const metadata = ask;
export default async function Page({
  params,
}: {
  params: Promise<{ askId: string }>;
}) {
  const askId = (await params).askId;
  return <AskPage askId={askId} />;
}
