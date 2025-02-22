import React from "react";
import Text from "@/components/atoms/Text/Text";
import { GoProject } from "react-icons/go";
import { FaPhone } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Branch } from "@/types/Branches";

interface BranchProps {
  branches: Branch[];
}

export default function Branches({ branches }: BranchProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 py-8">
      {branches?.map((branch) => (
        <div
          key={branch.id}
          className="flex flex-col bg-gradient-to-br from-white to-gray-100 border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          <div className="bg-main text-white px-6 py-4">
            <div className="flex items-center">
              <GoProject className="text-2xl mr-3" />
              <Text className="text-lg font-bold">
                {branch.branch_name || "Not available"}
              </Text>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center">
              <FaPhone className="text-main text-xl mr-4" />
              <Text className="text-gray-700">
                {branch.phone || "Not available"}
              </Text>
            </div>
            <div className="flex items-center">
              <MdEmail className="text-main text-xl mr-4" />
              <Text className="text-gray-700">
                {branch.email || "Not available"}
              </Text>
            </div>
            <div className="flex items-center">
              <FaLocationCrosshairs className="text-main text-xl mr-4" />
              <Text className="text-gray-700">{branch.city.name_en}</Text>
            </div>
          </div>
          <div className="bg-gray-100 px-6 py-4 mt-auto">
            <Text className="text-sm text-gray-500">
              {`Branch ID: ${branch.id}`}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}
