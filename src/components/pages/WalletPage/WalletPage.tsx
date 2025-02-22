import WalletPageTemplate from "@/components/templates/Wallet/WalletPageTemplate/WalletPageTemplate";
import React from "react";

export default async function WalletPage({ userId }: { userId: string }) {
  return <WalletPageTemplate userId={userId} />;
}
