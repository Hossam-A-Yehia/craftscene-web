import ReplyReceivedAskModalContent from "@/components/molecules/Modals/ReplyReceivedAskModalContent copy/ReplyReceivedAskModalContent";
import React from "react";

type ReplyModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  invitableId: number;
};

const ReplyReceivedAskModal = ({
  isOpen,
  onCancel,
  invitableId,
}: ReplyModalProps) => {
  return (
    <>
      {isOpen && (
        <div
          data-testid="reply-modal-overlay"
          className="fixed top-0 left-0 w-full bg-gray-500 bg-opacity-50 flex justify-center items-center min-h-screen z-50"
          style={{ margin: "0" }}
        >
          <div className="w-full max-w-lg">
            <ReplyReceivedAskModalContent
              invitableId={invitableId}
              data-testid="reply-modal-content"
              onCancel={onCancel}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReplyReceivedAskModal;
