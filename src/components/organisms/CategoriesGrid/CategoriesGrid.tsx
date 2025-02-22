import CategoryCard from "@/components/molecules/CategoryCard/CategoryCard";
import { useLanguage } from "@/hooks/useLanguage";
import React from "react";

interface CategoriesGridProps {
  link: string;
  categories: {
    id?: string;
    name_en: string;
    [key: `name_${string}`]: string | undefined;
    images: { url: string }[];
  }[];
}

const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  categories,
  link,
}) => {
  const lang = useLanguage();

  return (
    <div
      role="grid"
      className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 h-auto overflow-hidden rounded-3xl"
    >
      {categories?.map((category) => (
        <CategoryCard
          link={`/${link}/${category?.id}`}
          key={category?.id}
          imageUrl={category?.images[0]?.url}
          name={category[`name_${lang}`] || category?.name_en}
        />
      ))}
    </div>
  );
};

export default CategoriesGrid;
