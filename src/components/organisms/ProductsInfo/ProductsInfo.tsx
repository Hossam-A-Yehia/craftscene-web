import Button from "@/components/atoms/Button/Button";
import Text from "@/components/atoms/Text/Text";
import { useLanguage } from "@/hooks/useLanguage";
import { useMutateAddToCart } from "@/hooks/useOrders";
import { useLike } from "@/hooks/useLike";
import { Product, VariantProduct, ProductVariant } from "@/types/Products";
import { t } from "i18next";
import React, { useCallback, useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaShare } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { toast } from "react-toastify";
import ShareModal from "../Modals/ShareModal/ShareModal";
import NavLink from "@/components/atoms/NavLink/NavLink";
import Cookies from "js-cookie";

export default function ProductsInfo({
  product,
  variants,
  currentVariant,
  filters,
  onFilterChange,
}: {
  product: Product;
  variants: VariantProduct;
  currentVariant: ProductVariant[];
  filters: Record<keyof VariantProduct["attributes"], string>;
  onFilterChange: (
    attribute: keyof VariantProduct["attributes"],
    value: string
  ) => void;
}) {
  const { mutateAsync, isPending } = useMutateAddToCart();
  const [locationPathname, setLocationPathname] = useState("");
  const [token, setToken] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lang = useLanguage();
  const {
    isLiked,
    likes,
    isLikesLoading,
    isPendingAddLike,
    isPendingRemoveLike,
    handleLike,
  } = useLike(product?.id, "Product");
  const attributeTranslations: Record<string, string> = {
    Material: "المادة",
    Size: "الحجم",
    Color: "اللون",
  };

  const attributes = Object.keys(variants.attributes || {}) as Array<
    keyof VariantProduct["attributes"]
  >;

  const translatedAttributes = attributes.map((attribute) => ({
    en: attribute,
    ar: attributeTranslations[attribute as string] || attribute,
  }));

  const handleAddToCart = () => {
    const structuredData = {
      variant_id: currentVariant[0]?.variant_id,
      quantity: 1,
    };

    mutateAsync(structuredData)
      .then(() => {
        toast.info(t("Product Added Successfully!"));
      })
      .catch((err) => {
        toast.error(t(err.response.data.message));
      });
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocationPathname(window.location.pathname);
    }
  }, []);

  const toggleShareModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    setToken(Cookies.get("WAuthToken") || "");
  }, []);

  return (
    <div className="flex flex-col p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col">
          <Text className="text-2xl font-semibold mb-2">
            {product[`title_${lang}`] || product[`title_en`]}
          </Text>
          <NavLink href={`/business-user/${product?.user?.id}`}>
            {product?.user?.business_user_detail?.business_name}
          </NavLink>
        </div>
        <div className="flex flex-col gap-2">
          <button
            disabled={isLikesLoading || isPendingAddLike || isPendingRemoveLike}
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
          <button
            onClick={toggleShareModal}
            className="flex items-center space-x-2 px-2 py-2 bg-white opacity-70 hover:opacity-100 text-black rounded-lg duration-300"
            aria-label="Share"
          >
            <FaShare className="text-sm text-black rtl:ml-1" />
            <Text className="hidde text-sm lg:block">{t("idea.share")}</Text>
          </button>
        </div>
      </div>
      <Text className="text-gray-700 mb-4">
        {product[`rich_des_${lang}`] || product[`rich_des_en`]}
      </Text>
      <Text className="text-gray-700 mb-4">
        {product[`short_des_${lang}`] || product[`short_des_en`]}
      </Text>
      {translatedAttributes.map((attribute) => {
        const values = variants.attributes[attribute.en]?.values || [];
        return (
          values.length > 0 && (
            <div key={attribute.en} className="mb-4">
              <span className="text-lg font-semibold mr-2">
                {attribute[lang as keyof typeof attribute] || attribute.en} :
              </span>
              <div className="flex space-x-2">
                {values.map((value) => (
                  <button
                    key={value.en}
                    className={`w-fit py-1 px-3 h-8 border border-gray-300 ${
                      filters[attribute.en] === value.en
                        ? "bg-main text-white font-bold"
                        : ""
                    }`}
                    onClick={() => onFilterChange(attribute.en, value.en)}
                  >
                    {value[lang as keyof typeof value] || value.en}
                  </button>
                ))}
              </div>
            </div>
          )
        );
      })}
      <div className="mb-4">
        {currentVariant[0]?.price ? (
          <span className="text-lg font-semibold">
            {currentVariant[0]?.price}$
          </span>
        ) : (
          <div
            className="flex items-center space-x-2 text-red-600"
            role="alert"
          >
            <MdErrorOutline className="text-2xl" />
            <span className="text-lg font-semibold">
              {t("products.out_of_stock")}
            </span>
          </div>
        )}
      </div>
      {token && (
        <Button
          data-testid="add_to_cart"
          onClick={handleAddToCart}
          variant="main"
          disabled={!currentVariant[0]?.price || isPending}
        >
          {t("products.add_to_cart")}
        </Button>
      )}
      {locationPathname && (
        <ShareModal
          url={locationPathname}
          shareTitle={t("share.product")}
          img={product?.images?.[0]?.url || "/default.png"}
          isOpen={isModalOpen}
          onCancel={toggleShareModal}
        />
      )}
    </div>
  );
}
