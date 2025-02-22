"use client";
import React from "react";
import Container from "@/components/atoms/Container/Container";
import Text from "@/components/atoms/Text/Text";
import { t } from "i18next";
import EditUserForm from "@/components/organisms/EditUserForm/EditUserForm";

const EditUserTemplate = ({ userId }: { userId: string }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-5 px-4">
      <Container>
        <div className="w-full p-8 space-y-6">
          <Text className="text-2xl font-bold text-center text-gray-700">
            {t("edit_user.title")}
          </Text>
          <div data-testid="edit-user-form">
            <EditUserForm userId={userId} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditUserTemplate;
