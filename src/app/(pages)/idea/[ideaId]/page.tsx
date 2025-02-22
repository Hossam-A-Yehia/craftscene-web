import Idea from "@/components/pages/Idea/Idea";
import React from "react";
import { idea } from "@/config/metadata";
export const metadata = idea;

export default async function page({
  params,
}: {
  params: Promise<{ ideaId: string }>;
}) {
  const ideaId = (await params).ideaId;
  return <Idea ideaId={ideaId} />;
}
