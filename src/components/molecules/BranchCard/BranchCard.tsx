import Button from "@/components/atoms/Button/Button";
import Text from "@/components/atoms/Text/Text";
import DeleteModal from "@/components/organisms/Modals/DeleteModal/DeleteModal";
import { useMutateDeleteBranch } from "@/hooks/useBranches";
import { Branch } from "@/types/Branches";
import { useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import React, { useCallback, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
const BranchCard: React.FC<{ branch: Branch }> = ({ branch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutateDeleteBranch();

  const handleDeleteBranch = (id: number) => {
    mutateAsync(id)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["Branches"] });
        toast.info(t("Branch Deleted Successfully!"));
      })
      .catch(
        (err: { response: { data: { message: any | string | string[] } } }) => {
          toast.error(t(err.response.data.message));
          return err;
        }
      );
  };
  const toggle = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-300 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-4 md:mb-0">
          <Text className="text-lg font-semibold text-gray-800">
            {branch.branch_name}
          </Text>
          <Text className="text-gray-600 mt-1">
            {branch.city?.name_en || "Unknown City"}
          </Text>
          <Text className="text-gray-600 mt-1">
            {branch.phone || t("branches.no_phone")}
          </Text>
        </div>
        <div className="flex gap-3">
          <Button
            dataTestid="delete-branch-button"
            onClick={toggle}
            disabled={isPending}
            variant="delete"
            additionalClasses="flex items-center"
            aria-label="Delete Address"
          >
            <FaTrash className="mx-1" /> {t("branches.delete")}
          </Button>
        </div>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onCancel={toggle}
        onConfirm={() => {
          handleDeleteBranch(branch.id);
          toggle();
        }}
      />
    </div>
  );
};

export default BranchCard;
