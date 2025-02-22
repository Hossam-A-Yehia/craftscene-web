"use client";
import { useLanguage } from "@/hooks/useLanguage";
import { ProductAttributeType } from "@/types/Products";
import { t } from "i18next";
import React from "react";

interface ProductVariantsProps {
  data: ProductAttributeType[];
}

const ProductAttributes: React.FC<ProductVariantsProps> = ({ data }) => {
  const lang = useLanguage();
  const parsedData = data.map((item) => ({
    id: item.id,
    attributeName:
      item.attribute[`name_${lang}`] || item.attribute[`name_en`] || "N/A",
    value:
      JSON.parse(item.value)[`${lang}`] || JSON.parse(item.value)?.en || "N/A",
  }));

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        {t("products.product_details")}
      </h2>
      <table className="table-auto border-collapse border border-gray-200 w-full">
        <thead>
          <tr className="bg-gray-100">
            {parsedData.map((item) => (
              <th
                key={item.id}
                className="border border-gray-200 px-4 py-2 text-left rtl:text-right"
              >
                {item.attributeName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            {parsedData.map((item) => (
              <td key={item.id} className="border border-gray-200 px-4 py-2">
                {item.value}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductAttributes;
