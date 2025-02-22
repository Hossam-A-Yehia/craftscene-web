import VerifyModalContent from "@/components/molecules/Modals/VerifyModalContent/VerifyModalContent";
import React from "react";

type VerifyModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  target: string | undefined;
  isResendPending: boolean;
  onUpdate: (newValue: string) => void;
};

const VerifyModal = ({
  isOpen,
  onCancel,
  onConfirm,
  target,
  onUpdate,
  isResendPending,
}: VerifyModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center m-0 z-50"
          style={{ margin: 0 }}
        >
          <div className="w-full max-w-lg">
            <VerifyModalContent
              isResendPending={isResendPending}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              target={target || ""}
              onUpdate={onUpdate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyModal;
