"use client";
import ReferralCode from "@/components/molecules/Wallet/ReferralCode/ReferralCode";
import ReferredUsersList from "@/components/organisms/Wallet/ReferredUsersList/ReferredUsersList";
import { useFetchWallet } from "@/hooks/useWallet";
import { t } from "i18next";
import React from "react";

type WalletPageTemplateProps = {
  userId: string;
};

const WalletPageTemplate: React.FC<WalletPageTemplateProps> = ({ userId }) => {
  const { data: wallet } = useFetchWallet(userId);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          {t("wallet.wallet")}
        </h1>
        <p className="text-center text-gray-500 mb-6">
          All the Lorem Ipsum generators on the Internet tend to repeat.
        </p>
        <div className="text-center py-6 rounded-lg border border-orange-400 mb-6">
          <h2 className="text-4xl font-bold text-orange-600">
            {wallet?.wallet?.current_balance} {t("wallet.point")}
          </h2>
          <p className="text-gray-500 mt-2">
            {t("wallet.balance")} ({wallet?.wallet?.total_earned})
          </p>
        </div>
        <ReferralCode code={wallet?.referral_code} />
        <ReferredUsersList users={wallet?.referredUsers} />
      </div>
    </div>
  );
};

export default WalletPageTemplate;
