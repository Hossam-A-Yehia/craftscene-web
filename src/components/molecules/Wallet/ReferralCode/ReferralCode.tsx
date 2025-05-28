import Button from "@/components/atoms/Button/Button";
import Text from "@/components/atoms/Text/Text";
import ShareModal from "@/components/organisms/Modals/ShareModal/ShareModal";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiCopy, BiCheck, BiShare } from "react-icons/bi";

type ReferralCodeProps = {
  code: string;
};

const ReferralCode: React.FC<ReferralCodeProps> = ({ code }) => {
  const { t } = useTranslation();
  const [errorShare, setErrorShare] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleShareModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

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
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      setErrorShare("");
    } catch (error) {
      setErrorShare(
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message: unknown }).message)
          : "Failed to copy. Please try again."
      );
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
      setErrorShare("");
    } catch (error) {
      setErrorShare(
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message: unknown }).message)
          : "Failed to copy link. Please try again."
      );
    }
  };

  return (
    <div data-testid="referral-code-container">
      {errorShare && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4"
          data-testid="error-message"
        >
          {errorShare}
        </div>
      )}

      {/* Code Display */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6 mb-6">
        <div className="text-center">
          <div className="text-gray-500 text-sm font-medium mb-2 uppercase tracking-wider">
            Your Referral Code
          </div>
          <Text
            className="text-3xl font-bold text-gray-800 font-mono tracking-widest mb-4"
            testId="referral-code"
          >
            {code}
          </Text>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {!navigator.share ? (
              <div data-testid="copy-button-container">
                <Button
                  variant="main"
                  onClick={handleShareClick}
                  additionalClasses={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 ${
                    copied
                      ? "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      : ""
                  }`}
                  dataTestid="copy-button"
                >
                  {copied ? (
                    <>
                      <BiCheck className="text-lg" data-testid="check-icon" />
                      <span className="font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <BiCopy className="text-lg" data-testid="copy-icon" />
                      <span className="font-medium">{t("Copy")}</span>
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div
                data-testid="share-button-container"
                className="flex items-center gap-2"
              >
                <Button
                  variant="main"
                  onClick={toggleShareModal}
                  dataTestid="share-button"
                >
                  <BiShare className="text-lg" />
                  <span className="font-medium">{t("wallet.share")}</span>
                </Button>
                <Button
                  variant="main"
                  onClick={handleCopyLink}
                  additionalClasses={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 ${
                    linkCopied
                      ? "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      : ""
                  }`}
                  dataTestid="copy-link-button"
                >
                  {linkCopied ? (
                    <>
                      <BiCheck className="text-lg" />
                      <span className="font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">Copy</span>
                      <BiCopy className="text-lg" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-main   rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg
              className="w-4 h-4 text-main"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">{t("wallet.how_it_works")}</h4>
            <p className="text-white text-sm leading-relaxed">
              {t("wallet.how_it_works_desc")}
            </p>
          </div>
        </div>
      </div>
      <ShareModal
        url={code}
        shareTitle={"Referral Code"}
        isOpen={isModalOpen}
        onCancel={toggleShareModal}
        isReferralCode
      />
    </div>
  );
};

export default ReferralCode;
