import React from "react";
import {
  useFetchCategories,
  useFetchUserCategories,
  useMutateDeleteUserCategory,
} from "@/hooks/useCategories";
import generateNestedNames from "@/utils/generateNestedNames";
import UserCategoryForm from "@/components/molecules/UserCategories/UserCategoryForm/UserCategoryForm";
import UserCategoryTable from "@/components/molecules/UserCategories/UserCategoryTable/UserCategoryTable";
import { CategoyTypesEnum } from "./ValidationSchema";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/context/UserContext";

function UpdateUserCategories() {
  const queryClient = useQueryClient();
  const { userData } = useUser();
  const categoryType = CategoyTypesEnum[userData?.user_type_value || ""];
  const { data: categoriesData } = useFetchCategories({
    category_type: categoryType,
  });
  const {
    mutateAsync: mutateDeleteRowAsync,
    isPending: isMutateDeleteLoading,
  } = useMutateDeleteUserCategory();
  const { data: userCategories } = useFetchUserCategories(userData?.id ?? 0);

  const userCategoryIds =
    userCategories?.data?.payload?.map(
      (category: { category_id: number }) => category.category_id
    ) || [];

  const allCategories = categoriesData?.data?.payload || [];

  const mappedCategories = generateNestedNames(allCategories).map(
    (category) => ({
      label: category.name,
      value: category.id,
    })
  );

  const handleDeleteCategory = (categoryId: number) => {
    mutateDeleteRowAsync(categoryId)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["userCategories"] });
        toast.info("update_user_categories.deleted_succcess_message");
      })
      .catch((err) => {
        toast.error(err.message);
        return err;
      });
  };

  return (
    <>
      <UserCategoryForm
        userData={userData}
        mappedCategories={mappedCategories}
        userCategoryIds={userCategoryIds}
      />
      <UserCategoryTable
        isMutateDeleteLoading={isMutateDeleteLoading}
        onDelete={handleDeleteCategory}
        userCategories={userCategories?.data?.payload || []}
      />
    </>
  );
}

export default UpdateUserCategories;
