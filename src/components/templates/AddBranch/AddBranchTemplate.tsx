"use client";
import React from "react";
import Container from "@/components/atoms/Container/Container";
import Text from "@/components/atoms/Text/Text";
import { t } from "i18next";
import AddBranchForm from "@/components/organisms/AddBranchForm/AddBranchForm";

const AddBranchTemplate = ({ userId }: { userId: string }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-5 px-4">
      <Container>
        <div className="w-full p-8 space-y-6">
          <Text className="text-2xl font-bold text-center text-gray-700">
            {t("add_branch.title")}
          </Text>
          <AddBranchForm userId={userId} />
        </div>
      </Container>
    </div>
  );
};

export default AddBranchTemplate;
