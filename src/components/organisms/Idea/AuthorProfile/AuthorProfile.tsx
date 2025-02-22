"use client";
import Button from "@/components/atoms/Button/Button";
import CustomImage from "@/components/atoms/Image/CustomImage";
import Text from "@/components/atoms/Text/Text";
import { Idea } from "@/types/idea";
import { ProjectType } from "@/types/Projects";
import { t } from "i18next";
import Link from "next/link";
import React from "react";

export default function AuthorProfile({
  data,
  projectDetails,
}: {
  data: Idea;
  projectDetails: ProjectType;
}) {
  return (
    <div className="col-span-2 mt-[50px] md:mt-0 mx-auto w-full bg-white rounded-lg ">
      <div className="flex flex-col p-4 mx-auto gap-4">
        <Text className="text-2xl ">{data?.title_en}</Text>
        <div className="flex items-center gap-2 font-bold">
          Service :
          <Text className="font-light text-gray-700">
            {data?.service.name_en}
          </Text>
        </div>
        <div className="flex items-center gap-2 font-bold">
          Project :
          <Link href={`/projects/${projectDetails?.payload?.id}`}>
            <Text className="underline font-light text-gray-700 ">
              {projectDetails?.payload.title_en}
            </Text>
          </Link>
        </div>
        <div className="flex items-center gap-2 font-bold">
          Creation Date :
          <Text className="font-light text-gray-700">
            {projectDetails?.payload.creation_date}
          </Text>
        </div>
        <Text className="text-gray-700 text-sm ">{data?.description_en}</Text>
        <Text className="text-gray-500 text-md">
          {projectDetails?.payload.city.name_en},{" "}
          {projectDetails?.payload.city.country.name_en}
        </Text>

        <div className="w-20 h-20 rounded-full relative mx-auto">
          <CustomImage
            fill
            src={data?.user.business_user_detail.profile}
            alt="bon ton logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <Text className="text-center text-md font-semibold ">
          {data?.user.business_user_detail.business_name}
        </Text>
      </div>
      <Link
        href={`/business-user/${data?.user?.id}`}
        className="block w-fit mx-auto pb-4"
      >
        <Button variant="main" additionalClasses="font-semibold w-fit">
          {t("idea.view_profile")}
        </Button>
      </Link>
    </div>
  );
}
