"use client";
import Button from "@/components/atoms/Button/Button";
import Text from "@/components/atoms/Text/Text";
import AddressCard from "@/components/molecules/AddressCard/AddressCard";
import NoData from "@/components/molecules/NoDate/NoDate";
import { useFetchAddress } from "@/hooks/useAddress";
import { Address } from "@/types/Address";
import { t } from "i18next";
import Link from "next/link";
import React from "react";

type AddressTemplateProps = {
  userId: string;
};

const AddressTemplate: React.FC<AddressTemplateProps> = ({ userId }) => {
  const { data: addresses } = useFetchAddress(userId);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-center text-gray-700">
          {t("addresses.addresses")}
        </Text>
        <Text className="text-center text-gray-500 mt-2">
          {t("addresses.desc")}
        </Text>
        <div className="mt-8 grid grid-cols-1 gap-6 ">
          {addresses?.map((address: Address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
        {addresses?.length === 0 && <NoData />}
        <div className="mt-8 w-full flex justify-center">
          <Link href={`/add-address/${userId}`}>
            <Button
              dataTestid="add-address"
              variant="main"
              additionalClasses="px-6 py-3"
            >
              {t("addresses.add_address")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddressTemplate;
