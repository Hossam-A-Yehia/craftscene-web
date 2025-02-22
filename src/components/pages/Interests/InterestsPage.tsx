import InterestsTemplate from "@/components/templates/Interests/InterestsTemplate";
import React from "react";

export default async function InterestsPage({ userId }: { userId: string }) {
  return <InterestsTemplate userId={userId} />;
}
