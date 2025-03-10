"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BiMailSend, BiPhone, BiShareAlt } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Text from "@/components/atoms/Text/Text";
import { BusinessInfoType } from "@/types/User";
import { useLanguage } from "@/hooks/useLanguage";
import { USER_TYPE } from "@/constants/constants";
import { findLabelByValue } from "@/utils/generalUtils";
import CustomImage from "@/components/atoms/Image/CustomImage";

import ShareModal from "../Modals/ShareModal/ShareModal";
import { t } from "i18next";
import { useLike } from "@/hooks/useLike";
export default function BusinessInfo({
  businessInfo,
}: {
  businessInfo: BusinessInfoType;
}) {
  const lang = useLanguage();
  const userTypeValue = businessInfo?.user?.user_type;
  const userType = findLabelByValue(userTypeValue, USER_TYPE);
  const [locationPathname, setLocationPathname] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocationPathname(window.location.pathname);
    }
  }, []);

  const toggleShareModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);
  const {
    isLiked,
    likes,
    isLikesLoading,
    isPendingAddLike,
    isPendingRemoveLike,
    handleLike,
  } = useLike(businessInfo?.id, "BusinessUserDetail");

  return (
    <div className="w-full mt-5 ">
      <div
        className={`w-full h-[300px] bg-cover relative`}
        style={{
          backgroundImage: `url('${businessInfo?.profile || "/default.png"}')`,
        }}
      >
        <ul className="flex items-center absolute gap-3 flex-col right-5 top-1/2 -translate-y-1/2">
          {businessInfo.business_email && (
            <li className="">
              <a
                href={`mailto:?to=${businessInfo.business_email}`}
                className="bg-white flex items-center text-main rounded-full size-9 justify-center"
              >
                <BiMailSend className="text-xl" />
              </a>
            </li>
          )}
          {businessInfo.phone && (
            <li className="">
              <a
                href={`https://wa.me/${businessInfo.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white flex items-center text-main rounded-full size-9 justify-center"
              >
                <BiPhone className="text-xl" />
              </a>
            </li>
          )}
          <li className="">
            <button
              onClick={toggleShareModal}
              className="bg-white flex items-center text-main rounded-full size-9 justify-center"
            >
              <BiShareAlt className="text-xl" />
            </button>
          </li>
          <li>
            <button
              disabled={
                isLikesLoading || isPendingAddLike || isPendingRemoveLike
              }
              onClick={handleLike}
              className="flex items-center space-x-2 px-4 py-2 bg-white opacity-70 hover:opacity-100 text-black rounded-lg duration-300 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              {isLikesLoading ? (
                <span className="mr-3 size-5 animate-spin">.</span>
              ) : (
                <span className="flex items-center gap-2 justify-between">
                  {isLiked ? (
                    <FaHeart className="text-lg text-main" />
                  ) : (
                    <FaRegHeart className="text-lg" />
                  )}
                  {likes?.length}
                </span>
              )}
            </button>
          </li>
        </ul>
        <div className="info absolute -bottom-[120px] left-1/2 -translate-x-1/2 text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-2 mx-auto relative">
            <CustomImage
              src={businessInfo.logo || "/default.png"}
              alt="bon ton logo"
              fill
            />
          </div>
          <Text className="text-xl font-semibold text-black">
            {businessInfo.business_name}
          </Text>
          <Text className="text-slate-500 text-sm font-medium mt-1">
            {userType}
          </Text>
          <Text className="text-slate-500 text-sm font-medium mt-1">
            {`${
              businessInfo.city.country[`name_${lang}`] ||
              businessInfo.city.country.name_en
            }, ${
              businessInfo.city[`name_${lang}`] || businessInfo.city.name_en
            }`}
          </Text>
        </div>
      </div>
      {locationPathname && (
        <ShareModal
          url={locationPathname}
          shareTitle={t("share.profile")}
          img={businessInfo.logo || "/default.png"}
          isOpen={isModalOpen}
          onCancel={toggleShareModal}
        />
      )}
    </div>
  );
}
