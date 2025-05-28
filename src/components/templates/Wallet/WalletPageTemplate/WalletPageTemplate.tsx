"use client";
import ReferralCode from "@/components/molecules/Wallet/ReferralCode/ReferralCode";
import ReferredUsersList from "@/components/organisms/Wallet/ReferredUsersList/ReferredUsersList";
import { useFetchWallet } from "@/hooks/useWallet";
import React from "react";
import { useTranslation } from "react-i18next";

type WalletPageTemplateProps = {
  userId: string;
};

const WalletPageTemplate: React.FC<WalletPageTemplateProps> = ({ userId }) => {
  const { data: wallet } = useFetchWallet(userId);
const {t} = useTranslation()
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
            {t("wallet.wallet")}
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            {t("wallet.track_rewards")}
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative text-center">
              <div className="flex items-center gap-3 mb-4 justify-center">
                <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-wide">
                  {t("wallet.current_points")}
                </h2>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">
                {wallet?.wallet?.current_balance?.toLocaleString() || 0}
              </p>
              <p className="text-blue-600 font-medium">{t("wallet.points")}</p>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative text-center">
              <div className="flex items-center gap-3 mb-4 justify-center">
                <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-wide">
                  {t("wallet.current_balance")}
                </h2>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">
                ${wallet?.wallet?.current_balance?.toLocaleString() || 0}
              </p>
              <p className="text-purple-600 font-medium">{t("wallet.usd")}</p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Referral Code */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-400 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47A3 3 0 1015 8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t("wallet.share_and_earn")}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t("wallet.invite_friends")}
                </p>
              </div>
            </div>
            <ReferralCode code={wallet?.referral_code} />
          </div>

          {/* Referred Users */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-400 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t("wallet.your_network")}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t("wallet.friends_who_joined")}
                </p>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto pr-2">
              <ReferredUsersList users={wallet?.referredUsers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPageTemplate;
