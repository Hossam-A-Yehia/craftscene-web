import Button from "@/components/atoms/Button/Button";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";

type ModalContentProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteModalContent = ({ onConfirm, onCancel }: ModalContentProps) => {
  return (
    <div className="p-8 space-y-6 bg-white rounded-lg shadow-lg max-w-sm mx-auto transition-all transform scale-100 hover:scale-105">
      <div className="flex justify-center mb-4">
        <IoTrashOutline className="text-5xl text-red-600" />
      </div>
      <h3 className="text-2xl font-semibold text-center text-gray-800">
        Are you sure you want to delete this?
      </h3>
      <div className="flex justify-around space-x-4 mt-6">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button dataTestid="confirm" variant="delete" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default DeleteModalContent;
