import Container from "@/components/atoms/Container/Container";
import AdsSection from "@/components/organisms/AdsSection/AdsSection";
import ServicesSection from "@/components/templates/ShopProducts/ServicesSection/ServicesSection";
import { getAds } from "@/services/Ads";
import { getServices } from "@/services/Services";
import { Ad } from "@/types/Ads";

const ProductsServices = async ({ categoryId }: { categoryId: string }) => {
  const services = await getServices({ categoryId });
  const ads = await getAds();
  const adsCategories = ads.payload.data.filter(
    (ads: Ad) => ads.modelable_id === Number(categoryId)
  );
  return (
    <div className="bg-[#F6F7FC]">
      <Container>
        {adsCategories.length > 0 && <AdsSection ads={adsCategories} />}
        <ServicesSection productsServices={services?.payload} />;
      </Container>
    </div>
  );
};

export default ProductsServices;
