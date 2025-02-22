"use client";
import Button from "@/components/atoms/Button/Button";
import Text from "@/components/atoms/Text/Text";
import BranchCard from "@/components/molecules/BranchCard/BranchCard";
import NoData from "@/components/molecules/NoDate/NoDate";
import { useFetchBranches } from "@/hooks/useBranches";
import { Branch } from "@/types/Branches";
import { t } from "i18next";
import Link from "next/link";
import React from "react";

const BranchesTemplate = ({ userId }: { userId: string }) => {
  const { data: branches } = useFetchBranches(userId);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-center text-gray-700">
          {t("branches.branches")}
        </Text>
        <Text className="text-center text-gray-500 mt-2">
          {t("branches.desc")}
        </Text>

        {branches?.length === 0 ? (
          <div data-testid="noData">
            <NoData />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 ">
            {branches?.map((branch: Branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>
        )}
        <div className="mt-8 w-full flex justify-center">
          <Link href={`/add-branch/${userId}`}>
            <Button
              dataTestid="add-branch"
              variant="main"
              additionalClasses="px-6 py-3"
            >
              {t("branches.add_branch")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BranchesTemplate;
