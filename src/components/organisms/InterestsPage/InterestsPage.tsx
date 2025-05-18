"use client";
import Button from "@/components/atoms/Button/Button";
import Text from "@/components/atoms/Text/Text";
import { CLIENT } from "@/constants/constants";
import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/hooks/useLanguage";
import { useMutateEditInterests } from "@/hooks/useUser";
import { Category, InterestsPageProps } from "@/types/Interests";
import { t } from "i18next";
import { useRouter } from "next/navigation";
import React, { JSX, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const InterestsPage: React.FC<InterestsPageProps> = ({
  categories,
  userInterests,
  userId,
}) => {
  const router = useRouter();
  const { userData } = useUser();
  const lang = useLanguage();
  const { mutateAsync, isPending } = useMutateEditInterests();
  const [urlKey, setUrlKey] = useState("");

  useEffect(() => {
    // This runs only on the client
    const href = window.location.href;
    const key = href.split("/")[3];
    setUrlKey(key);
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    categories[0]?.id || null
  );
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [excludedServices, setExcludedServices] = useState<number[]>([]);
  const [newlySelectedServices, setNewlySelectedServices] = useState<number[]>(
    []
  );

  const userInterestsIds = userInterests.map((interest) => interest.service_id);

  const activeUserInterests = userInterestsIds.filter(
    (id) => !excludedServices.includes(id)
  );

  const isServiceActive = (serviceId: number): boolean =>
    activeUserInterests.includes(serviceId) ||
    newlySelectedServices.includes(serviceId);

  const toggleSection = (categoryId: number): void => {
    setOpenSections((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleService = (serviceId: number): void => {
    if (userInterestsIds.includes(serviceId)) {
      setExcludedServices((prev) =>
        prev.includes(serviceId)
          ? prev.filter((id) => id !== serviceId)
          : [...prev, serviceId]
      );
    } else {
      setNewlySelectedServices((prev) =>
        prev.includes(serviceId)
          ? prev.filter((id) => id !== serviceId)
          : [...prev, serviceId]
      );
    }
  };

  const getAllActiveServices = (): number[] => {
    return Array.from(
      new Set([...activeUserInterests, ...newlySelectedServices])
    );
  };

  const handleSave = async () => {
    const allServices = getAllActiveServices();
    const formattedServices = allServices.map((serviceId) => ({
      user_id: +userId,
      service_id: serviceId,
    }));
    mutateAsync(formattedServices)
      .then(() => {
        toast.info(t("user_interests.success_message"));
        if (urlKey === "profile-interests") {
          if (userData?.user_type === CLIENT) {
            Cookies.remove("signUpToken");
            localStorage.removeItem("userData-craft");
            window.location.replace("/login");
          } else {
            router.push(`/packages/${userId}`);
            localStorage.removeItem("userData-craft");
          }
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const renderCategories = (categories: Category[]): JSX.Element[] =>
    categories.map((category) => (
      <div
        key={category.id}
        data-testid={`category-container-${category.id}`}
        className="bg-white rounded-lg shadow-sm border border-gray-100 my-3"
      >
        <button
          data-testid={`category-button-${category.id}`}
          onClick={() => toggleSection(category.id)}
          className="w-full px-6 py-4 flex items-center justify-between text-left"
        >
          <span className="font-medium">
            {category[`name_${lang}`] || category[`name_${lang}`]}
          </span>
          <span className="text-gray-500">
            {openSections.includes(category.id) ? (
              <IoIosArrowUp />
            ) : (
              <IoIosArrowDown />
            )}
          </span>
        </button>
        {openSections.includes(category.id) && (
          <div
            className="px-6 pb-4"
            data-testid={`category-content-${category.id}`}
          >
            {category.services?.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4">
                {category.services.map((service) => (
                  <button
                    key={service.id}
                    data-testid={`service-button-${service.id}`}
                    onClick={() => toggleService(service.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                      isServiceActive(service.id)
                        ? "border-orange-500 text-orange-500 bg-orange-50"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    {isServiceActive(service.id) && <FaCheck />}
                    {service[`name_${lang}`] || service[`name_${lang}`]}
                  </button>
                ))}
              </div>
            )}
            {category.children?.length > 0 &&
              renderCategories(category.children)}
          </div>
        )}
      </div>
    ));

  return (
    <div className="max-w-4xl mx-auto p-6" data-testid="interests-page">
      <Text className="text-2xl font-bold text-center text-gray-700">
        {t("user_interests.title")}
      </Text>
      <div
        className="flex flex-wrap justify-center gap-4 my-8"
        data-testid="main-categories"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            data-testid={`main-category-button-${category.id}`}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-full transition-all ${
              selectedCategory === category.id
                ? "bg-orange-500 text-white"
                : "border border-orange-500 text-orange-500 hover:bg-orange-50"
            }`}
          >
            {category[`name_${lang}`] || category[`name_${lang}`]}
          </button>
        ))}
      </div>
      <div className="space-y-4" data-testid="subcategories">
        {selectedCategory &&
          renderCategories(
            categories.find((cat) => cat.id === selectedCategory)?.children ||
              []
          )}
      </div>
      <div className="mt-8">
        <Button
          variant="main"
          dataTestid="save-button"
          loading={isPending}
          onClick={handleSave}
        >
          {t("user_interests.save")}
        </Button>
      </div>
    </div>
  );
};

export default InterestsPage;
