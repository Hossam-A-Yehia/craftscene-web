import ShareModalContent from "@/components/molecules/Modals/ShareModalContent/ShareModalContent";
import React from "react";

type ShareModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  img?: string;
  shareTitle: string;
  url: string;
  isReferralCode?:boolean
};

const ShareModal = ({
  isOpen,
  onCancel,
  img,
  shareTitle,
  url,
  isReferralCode
}: ShareModalProps) => {
  const handleCancel = () => {
    onCancel();
  };
  return (
    <>
      {isOpen && (
        <div
          data-testid="share-modal"
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center m-0 z-50"
          style={{ margin: 0 }}
        >
          <div
            data-testid="share-modal-overlay"
            className="absolute inset-0"
            onClick={handleCancel}
          />
          <div
            data-testid="share-modal-content-wrapper"
            className="w-full max-w-lg relative"
          >
            <ShareModalContent
              data-testid="share-modal-content"
              url={url}
              shareTitle={shareTitle}
              onCancel={handleCancel}
              img={img}
              isReferralCode={isReferralCode}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShareModal;
