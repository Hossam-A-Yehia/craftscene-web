import DeleteModalContent from "@/components/molecules/Modals/DeleteModalContent/DeleteModalContent";
import React from "react";

type DeleteModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteModal = ({ isOpen, onCancel, onConfirm }: DeleteModalProps) => {
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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <DeleteModalContent
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      )}
    </>
  );
};

export default DeleteModal;
