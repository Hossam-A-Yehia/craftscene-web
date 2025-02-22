import AskTemplate from "@/components/templates/Ask/AskTemplate";
import React from "react";

export default async function AskPage({ askId }: { askId: string }) {
  return <AskTemplate askId={askId} />;
}
