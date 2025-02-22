import Button from "@/components/atoms/Button/Button";
import Text from "@/components/atoms/Text/Text";
import { t } from "i18next";
import React, { useState } from "react";
import { BiCopy } from "react-icons/bi";

type ReferralCodeProps = {
  code: string;
};

const ReferralCode: React.FC<ReferralCodeProps> = ({ code }) => {
  const [errorShare, setErrorShare] = useState<string>("");

  const handleShareClick = async () => {
    const shareData = {
      title: "Referral Code",
      text: `Use my referral code "${code}" and earn rewards!`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
      }
    } catch (error) {
      setErrorShare(error as any);
    }
  };
  return (
    <div className="mb-6" data-testid="referral-code-container">
      {errorShare && (
        <div className="text-red-400 text-center" data-testid="error-message">
          {errorShare}
        </div>
      )}
      <h3 className="text-xl font-bold mb-2" data-testid="referral-title">
        {t("wallet.referral_code")}
      </h3>
      <div className="flex items-center justify-between">
        <Text
          className="text-orange-600 text-2xl font-bold"
          testId="referral-code"
        >
          {code}
        </Text>
        {!navigator.share ? (
          <div data-testid="copy-button-container">
            <Button
              variant="main"
              onClick={handleShareClick}
              additionalClasses="flex items-center gap-2"
              dataTestid="copy-button"
            >
              <BiCopy data-testid="copy-icon" />
              {t("Copy")}
            </Button>
          </div>
        ) : (
          <div data-testid="share-button-container">
            <Button
              variant="main"
              onClick={handleShareClick}
              dataTestid="share-button"
            >
              {t("wallet.share")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralCode;
