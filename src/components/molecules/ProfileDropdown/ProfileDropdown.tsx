import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FaUser,
  FaBuilding,
  FaTachometerAlt,
  FaWallet,
  FaHeart,
  FaSignOutAlt,
  FaQuestion,
} from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { RiQuestionnaireLine } from "react-icons/ri";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Cookies from "js-cookie";
import { MdDashboard, MdLocationCity } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import Text from "@/components/atoms/Text/Text";
import {
  CLIENT,
  SERVICE_PROVIDER_CRAFTSMEN,
  SERVICE_PROVIDER_FREELANCE,
  SUPPLIER,
} from "@/constants/constants";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { useTranslation } from "react-i18next";
import { BiCopy, BiShare } from "react-icons/bi";
import { toast } from "react-toastify";
import { GoGift } from "react-icons/go";
import ShareModal from "@/components/organisms/Modals/ShareModal/ShareModal";

interface ProfileDropdownProps {
  userName: string;
  userTypeValue: string;
  userImage?: string;
  userId: string;
  userType: number;
  referral_code: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  userName,
  userTypeValue,
  userImage,
  userType,
  userId,
  referral_code,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleShareModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleLogout = () => {
    Cookies.remove("WAuthToken");
    window.location.replace("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      icon: <FaUser className="w-4 h-4 text-blue-600" />,
      label: t("home.header.edit_profile"),
      href: `/edit-user/${userId}`,
    },
    ...(userType !== CLIENT && userType !== SERVICE_PROVIDER_CRAFTSMEN
      ? [
          {
            icon: <MdDashboard className="w-4 h-4 text-purple-500" />,
            label: t("home.header.dashboard"),
            href: "https://dashboard.craftsceneapp.com/",
          },
        ]
      : []),
    ...(userType !== CLIENT
      ? [
          {
            icon: <FaBuilding className="w-4 h-4 text-cyan-500" />,
            label: t("home.header.update_business_profile"),
            href: "/update-business-profile",
          },
          {
            icon: <FaTachometerAlt className="w-4 h-4 text-orange-500" />,
            label: t("home.header.job_bank"),
            href: `/job-bank`,
          },
          {
            icon: (
              <VscGitPullRequestGoToChanges className="w-4 h-4 text-orange-500" />
            ),
            label: t("home.header.incoming_rfqs"),
            href: `/invitations`,
          },
          {
            icon: (
              <VscGitPullRequestGoToChanges className="w-4 h-4 text-orange-500" />
            ),
            label: t("home.header.my_rfqs"),
            href: `/rfqs`,
          },
          {
            icon: <FaQuestion className="w-4 h-4 text-orange-500" />,
            label: t("home.header.incoming_asks"),
            href: `/received-asks`,
          },
          {
            icon: <FaQuestion className="w-4 h-4 text-orange-500" />,
            label: t("home.header.my_asks"),
            href: `/asks`,
          },
        ]
      : []),

    {
      icon: <FaWallet className="w-4 h-4 text-orange-500" />,
      label: t("home.header.wallet"),
      href: `/wallet/${userId}`,
    },
    {
      icon: <IoCartOutline className="w-4 h-4 text-orange-500" />,
      label: t("home.header.cart"),
      href: `/cart/${userId}`,
    },
    {
      icon: <AiFillProduct className="w-4 h-4 text-orange-500" />,
      label: t("home.header.orders"),
      href: `/orders`,
    },
    ...(userType === SUPPLIER
      ? [
          {
            icon: <AiFillProduct className="w-4 h-4 text-orange-500" />,
            label: t("home.header.incoming_orders"),
            href: `/incoming-orders`,
          },
        ]
      : []),
    {
      icon: <FaHeart className="w-4 h-4 text-cyan-500" />,
      label: t("home.header.interests"),
      href: `/interests/${userId}`,
    },
    {
      icon: <GrMapLocation className="w-4 h-4 text-blue-600" />,
      label: t("home.header.addresses"),
      href: `/address/${userId}`,
    },
    ...(userType !== SERVICE_PROVIDER_FREELANCE && userType !== CLIENT
      ? [
          {
            icon: <MdLocationCity className="w-4 h-4 text-orange-500" />,
            label: t("home.header.branches"),
            href: `/branches/${userId}`,
          },
        ]
      : []),
    {
      icon: <RiQuestionnaireLine className="w-4 h-4 text-orange-500" />,
      label: t("home.header.ask"),
      href: `/add-ask`,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        data-testid="profile-dropdown-button"
        dir="ltr"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-lg focus:outline-none transition-colors"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={userImage || "/default.png"}
            alt={userName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-left">
          <Text className="text-md font-semibold whitespace-nowrap">
            {userName}
          </Text>
          <Text className="text-xs text-main">
            {userTypeValue.length > 20
              ? `${userTypeValue.substring(0, 20)}...`
              : userTypeValue}
          </Text>
        </div>
        {isOpen ? (
          <FiChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <FiChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {isOpen && (
        <div
          data-testid="profile-dropdown-menu"
          className="absolute -right-10 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 ring-1 ring-gray-200 max-h-[400px] overflow-y-scroll"
        >
          <div className="px-4 py-2 flex items-center justify-between gap-2 bg-gray-100 flex-col">
            <div className="flex items-center justify-center w-full gap-4">
              <GoGift size={40} className="text-main" />
              <div className="flex flex-col gap-1">
                <Text className="text-sm  font-bold">Earn Rewards</Text>
                <Text className="text-xs text-gray-500">
                  Share your referral code and earn points
                </Text>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <span
                className="text-sm font-medium text-main bg-gray-200 p-1 rounded-lg flex gap-2 items-center cursor-pointer hover:bg-white duration-300"
                onClick={() => {
                  navigator.clipboard.writeText(referral_code);
                  toast.success("Copied!");
                }}
              >
                <BiCopy />
                {referral_code}
              </span>
              <div className="">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-main text-sm flex items-center gap-2 text-white py-1  px-2 rounded-lg"
                >
                  <BiShare /> Share now
                </button>
              </div>
            </div>
          </div>
          {menuItems.map((item, index) => (
            <div onClick={() => setIsOpen(false)} key={index}>
              <Link
                data-testid={`profile-dropdown-${item.label}`}
                href={item.href}
                className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors"
                target={item.label === "Dashboard" ? "_blank" : ""}
              >
                {item.icon}
                <span className="mx-3 text-gray-700">{item.label}</span>
              </Link>
            </div>
          ))}
          <div
            onClick={handleLogout}
            className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <FaSignOutAlt className="w-4 h-4 text-red-500" />
            <span className="ml-3 text-gray-700">Logout</span>
          </div>
        </div>
      )}
      <ShareModal
        url={referral_code}
        shareTitle={"Referral Code"}
        isOpen={isModalOpen}
        onCancel={toggleShareModal}
        isReferralCode
      />
    </div>
  );
};

export default ProfileDropdown;
