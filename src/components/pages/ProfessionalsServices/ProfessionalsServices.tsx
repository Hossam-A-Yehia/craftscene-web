import Container from "@/components/atoms/Container/Container";
import AdsSection from "@/components/organisms/AdsSection/AdsSection";
import ServicesSection from "@/components/templates/Professionals/ServicesSection/ServicesSection";
import { getAds } from "@/services/Ads";
import { getServices } from "@/services/Services";
import { Ad } from "@/types/Ads";

const ProfessionalsServices = async ({
  categoryId,
}: {
  categoryId: string;
}) => {
  const services = await getServices({ categoryId });
  const ads = await getAds();
  const adsCategories = ads.payload.data.filter(
    (ads: Ad) => ads.modelable_id === Number(categoryId)
  );
  return (
    <div className="bg-[#F6F7FC]">
      <Container>
        {adsCategories.length > 0 && <AdsSection ads={adsCategories} />}
        <ServicesSection
          categoryId={categoryId}
          professionalsServices={services?.payload}
        />
        ;
      </Container>
    </div>
  );
};

export default ProfessionalsServices;
