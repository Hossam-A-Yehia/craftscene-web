import ReplyTemplate from "@/components/templates/Reply/ReplyTemplate";
import React from "react";

export default async function ReplyPage({ replyId }: { replyId: string }) {
  return <ReplyTemplate replyId={replyId} />;
}
