import React from "react";
import { useRouter } from "next/navigation";
import InterestModalContent from "@/components/molecules/Modals/InterestModalContent/InterestModalContent";
import { useUser } from "@/context/UserContext";

type InterestModalProps = {
  isOpen: boolean;
  onCancel: () => void;
};

const InterestModal = ({ isOpen, onCancel }: InterestModalProps) => {
  const router = useRouter();
  const {userData} = useUser()

  const handleConfirm = () => {
    onCancel();
    router.push(`/profile-interests/${userData?.id}`); 
  };

  const handleCancel = () => {
    onCancel();
    router.push(`/packages/${userData?.id}`);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 m-0 p-0">
          <InterestModalContent onConfirm={handleConfirm} onCancel={handleCancel} />
        </div>
      )}
    </>
  );
};

export default InterestModal;
