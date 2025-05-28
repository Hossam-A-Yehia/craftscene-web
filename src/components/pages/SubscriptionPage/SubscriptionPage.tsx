import SubscriptionTemplate from "@/components/templates/Subscriptions/SubscriptionTemplate";
import React from "react";

export default async function SubscriptionPage({ userId }: { userId: string }) {
  return <SubscriptionTemplate userId={userId} />;
}
