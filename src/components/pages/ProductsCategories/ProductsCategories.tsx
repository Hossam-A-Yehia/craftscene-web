import Container from "@/components/atoms/Container/Container";
import AdsSection from "@/components/organisms/AdsSection/AdsSection";
import CategoriesSection from "@/components/templates/ShopProducts/CategoriesSection/CategoriesSection";
import { getAds } from "@/services/Ads";
import { Categories } from "@/services/home/Home";
import { Ad } from "@/types/Ads";
import { CategoriesData } from "@/types/Organisms";

const ProductsCategories = async ({ categoryId }: { categoryId: string }) => {
  const categories = await Categories();
  const ads = await getAds();
  const adsServices = ads.payload.data.filter(
    (ads: Ad) => ads.modelable_id === Number(categoryId)
  );
  const productsCategories = categories?.payload
    ?.filter((category: CategoriesData) => category.name_en === "Supplier")[0]
    ?.children?.filter((cat: any) => cat.id === Number(categoryId));

  return (
    <div className="bg-[#F6F7FC]">
      <Container>
        {adsServices.length > 0 && <AdsSection ads={adsServices} />}
        <CategoriesSection productsCategories={productsCategories} />;
      </Container>
    </div>
  );
};

export default ProductsCategories;
