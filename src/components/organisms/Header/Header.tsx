"use client";

import Button from "@/components/atoms/Button/Button";
import CustomImage from "@/components/atoms/Image/CustomImage";
import React, { useState, useEffect } from "react";
import logo from "@/assets/images/home-logo.svg";
import Dropdown from "@/components/atoms/Dropdown/Dropdown";
import { FiMenu } from "react-icons/fi";
import { CategoriesData } from "@/types/Organisms";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";
import ProfileDropdown from "@/components/molecules/ProfileDropdown/ProfileDropdown";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LanguageToggle from "@/components/atoms/LanguageToggle/LanguageToggle";
import { useUser } from "@/context/UserContext";
import NotificationsDropdown from "@/components/molecules/NotificationsDropdown/NotificationsDropdown";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  categoriesData: CategoriesData;
}
const Header: React.FC<HeaderProps> = ({ categoriesData }) => {
  const {t}=  useTranslation()
  const { userData } = useUser();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = useLanguage();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const categories = categoriesData?.payload?.filter(
    (category: CategoriesData) => category.name_en !== "Supplier"
  );

  const shopCategories = categoriesData?.payload?.filter(
    (category: CategoriesData) => category.name_en === "Supplier"
  );

  const items =
    shopCategories?.[0]?.children?.map((category: any) => ({
      label: category[`name_${lang}`] || category[`name_en`],
      href:
        category.children.length === 0
          ? `/products-services/${category.id}`
          : `/shop-products/${category.id}`,
    })) || [];

  const suppliers =
    shopCategories?.[0]?.children?.map((category: any) => ({
      label: category[`name_${lang}`] || category[`name_en`],
      href:
        category.children.length === 0
          ? `/professionals-services/${category.id}`
          : `/professionals-categories/${category.id}`,
    })) || [];
  const handleRFQLink = () => {
    if (userData) {
      router.push("/add-rfq");
    } else {
      toast.error("home.header.access_rfq_massage");
    }
  };

  return (
    <header className="flex justify-between items-center bg-white max-h-[80px] py-3 relative gap-2 container mx-auto">
      <Link href="/" className="">
        <div className="w-[150px] h-[150px] relative">
          <CustomImage src={logo} alt="Logo" fill className="flex-shrink-0" />
        </div>
      </Link>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden focus:outline-none"
      >
        <FiMenu size={24} />
      </button>
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-10"
        />
      )}
      <nav
        className={`flex-1 ${
          isMenuOpen
            ? "absolute top-[50px] right-0 bg-slate-100 w-1/2 p-2 z-20"
            : "hidden"
        } lg:flex lg:items-center lg:justify-between`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center text-sm">
          <Link href="/" className="px-2 py-2 lg:py-0">
            {t("home.header.home")}
          </Link>
          <Link href="/ideas-services" className="px-2 py-2 lg:py-0">
            {t("home.header.ideas")}
          </Link>
          <Dropdown label={t("home.header.shop")} items={items} />
          <Dropdown
            label={t("home.header.professionals")}
            items={categories?.map((category: CategoriesData) => ({
              label: category[`name_${lang}`] || category[`name_en`],
              href:
                category.children.length === 0
                  ? `/professionals-services/${category.id}`
                  : `/professionals-categories/${category.id}`,
            }))}
          />

          <Dropdown label={t("home.header.suppliers")} items={suppliers} />
          <button
            onClick={handleRFQLink}
            className="px-2 py-2 lg:py-0 whitespace-nowrap"
          >
            {t("home.header.rfq")}
          </button>
          <a href="#geosearch" className="px-2 py-2 lg:py-0 whitespace-nowrap">
            {t("home.header.geo")}
          </a>
        </div>
        <div className="flex items-center">
          {userData && <NotificationsDropdown />}
          {userData ? (
            <ProfileDropdown
              userType={userData?.user_type}
              userId={String(userData?.id)}
              userName={userData?.username}
              userTypeValue={userData?.user_type_value || ""}
              userImage={userData?.business_user_detail?.logo}
            />
          ) : (
            <div className="flex flex-col lg:flex-row gap-2 mt-4 lg:mt-0">
              <Link href="/login">
                <Button additionalClasses="font-semibold" variant="main">
                  {t("home.header.login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button additionalClasses="font-semibold" variant="outlineMain">
                  {t("home.header.signup")}
                </Button>
              </Link>
            </div>
          )}
          <div className="mx-3">
            <LanguageToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
