import PackagesTemplate from "@/components/templates/Packages/PackagesTemplate";
import React from "react";

export default async function PackagesPage({ userId }: { userId: string }) {
  return <PackagesTemplate userId={userId} />;
}
