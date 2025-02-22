import Container from "@/components/atoms/Container/Container";
import AdsSection from "@/components/organisms/AdsSection/AdsSection";
import CategoriesSection from "@/components/templates/Professionals/CategoriesSection/CategoriesSection";
import { SUPPLIER_ID } from "@/constants/constants";
import { getAds } from "@/services/Ads";
import { Categories } from "@/services/home/Home";
import { Ad } from "@/types/Ads";
import { CategoriesData } from "@/types/Organisms";

const ProfessionalsCategories = async ({
  parentCategoryId,
}: {
  parentCategoryId: string;
}) => {
  const categories = await Categories();
  const ads = await getAds();
  const adsServices = ads.payload.data.filter(
    (ads: Ad) => ads.modelable_id === Number(parentCategoryId)
  );
  const professionalsCategories = categories?.payload?.filter(
    (category: CategoriesData) =>
      String(category.id) === String(parentCategoryId)
  )[0];
  const supplierCategory = categories?.payload?.filter(
    (category: CategoriesData) => category.id === SUPPLIER_ID
  )[0];

  const supplierCategories = supplierCategory.children?.filter(
    (category: CategoriesData) =>
      String(category.id) === String(parentCategoryId)
  );

  return (
    <div className="bg-[#F6F7FC]">
      <Container>
        {adsServices.length > 0 && <AdsSection ads={adsServices} />}
        <CategoriesSection
          professionalsCategories={professionalsCategories}
          parentCategoryId={parentCategoryId}
          supplierCategories={supplierCategories}
        />
        ;
      </Container>
      s
    </div>
  );
};

export default ProfessionalsCategories;
