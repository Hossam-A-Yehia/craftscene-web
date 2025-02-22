import Button from "@/components/atoms/Button/Button";
import Text from "@/components/atoms/Text/Text";
import DeleteModal from "@/components/organisms/Modals/DeleteModal/DeleteModal";
import { useMutateDeleteIdea } from "@/hooks/useAddress";
import { Address } from "@/types/Address";
import { useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import React, { useCallback, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
const AddressCard: React.FC<{ address: Address }> = ({ address }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutateDeleteIdea();

  const handleDeleteAddress = (id: number) => {
    mutateAsync(id)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["Address"] });
        toast.info(t("Address Deleted Successfully!"));
      })
      .catch((err) => {
        toast.error(t(err.response.data.message));
        return err;
      });
  };
  const toggle = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-300 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-4 md:mb-0">
          <Text className="text-lg font-semibold text-gray-800">
            {address.title}
          </Text>
          <Text className="text-gray-600 mt-1">
            {address.street_address && address.street_address + ","}{" "}
            {address.city?.name_en || "Unknown City"}
          </Text>
          <Text className="text-gray-600 mt-1">
            {address.phone || t("addresses.no_phone")}
          </Text>
          <Text className="text-gray-500 mt-2 text-sm">
            {address.special_instructions}
          </Text>
        </div>
        <div className="flex gap-3">
          <Button
            dataTestid="delete-address-button"
            onClick={toggle}
            disabled={isPending}
            variant="delete"
            additionalClasses="flex items-center"
            aria-label="Delete Address"
          >
            <FaTrash className="mx-1" /> {t("addresses.delete")}
          </Button>
        </div>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onCancel={toggle}
        onConfirm={() => {
          handleDeleteAddress(address.id);
          toggle();
        }}
      />
    </div>
  );
};

export default AddressCard;
