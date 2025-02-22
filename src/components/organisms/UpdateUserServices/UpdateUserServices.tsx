import UserServicesForm from "@/components/molecules/UserServices/UserServicesForm/UserServicesForm";
import UserServiceTable from "@/components/molecules/UserServices/UserServiceTable/UserServiceTable";
import { useMutateDeleteUserService } from "@/hooks/useServices";
import { useFetchUser, useFetchUserServices } from "@/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";

function UpdateUserServices() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: mutateDeleteServiceAsync,
    isPending: isMutateDeleteLoading,
  } = useMutateDeleteUserService();

  const { data: userData } = useFetchUser();
  const { data: { payload: userServices = [] } = {} } = useFetchUserServices(
    String(userData?.id)
  );

  const handleDeleteService = (serviceId: number) => {
    mutateDeleteServiceAsync(serviceId)
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["user-services", userData?.id],
        });
        toast.info("update_user_services.deleted_succcess_message");
      })
      .catch((err: any) => {
        toast.error(err.message);
        return err;
      });
  };
  return (
    <>
      <UserServicesForm
        userServices={userServices}
        userId={userData?.id}
        userType={userData?.user_type}
      />
      <UserServiceTable
        isMutateDeleteLoading={isMutateDeleteLoading}
        onDelete={handleDeleteService}
        userServices={userServices?.data || []}
      />
    </>
  );
}

export default UpdateUserServices;
