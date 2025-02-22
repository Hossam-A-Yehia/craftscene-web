import AcceptOrderModalContent from "@/components/molecules/Modals/AcceptOrderModalContent/AcceptOrderModalContent";
import React from "react";

type AddressModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: any;
  selectedProductIds: number[];
  productsDetails: any;
  orderId: string;
};

const AcceptOrderModal = ({
  isOpen,
  onCancel,
  onConfirm,
  selectedProductIds,
  productsDetails,
  orderId,
}: AddressModalProps) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <>
      {isOpen && (
        <div
          data-testid="address-modal-overlay"
          className="fixed top-0 left-0 w-full bg-gray-500 bg-opacity-50 flex justify-center items-center min-h-screen"
          style={{ margin: "0" }}
        >
          <div className="w-full max-w-lg">
            <AcceptOrderModalContent
              orderId={orderId}
              data-testid="address-modal-content"
              onConfirm={handleConfirm}
              onCancel={onCancel}
              selectedProductIds={selectedProductIds}
              productsDetails={productsDetails}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AcceptOrderModal;
