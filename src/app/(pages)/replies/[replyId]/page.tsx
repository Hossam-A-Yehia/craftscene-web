import ReplyPage from "@/components/pages/ReplyPage/ReplyPage";
import { reply } from "@/config/metadata";
import React from "react";
export const metadata = reply;
export default async function Page({
  params,
}: {
  params: Promise<{ replyId: string }>;
}) {
  const replyId = (await params).replyId;
  return <ReplyPage replyId={replyId} />;
}
