"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import TextContainer from "../TextContainer/TextContainer";
import SharedTitle from "@/components/molecules/home/SharedTitle/SharedTitle";
import Text from "@/components/atoms/Text/Text";
import CustomImage from "@/components/atoms/Image/CustomImage";
import { useLanguage } from "@/hooks/useLanguage";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { IdeasData } from "@/types/Ideas";
import Link from "next/link";
import Button from "@/components/atoms/Button/Button";
interface FeatruesSliderProps {
  ideasData: IdeasData;
  productsData: any;
  professionals: any;
  suppliers: any;
}
const FeatruesSlider: React.FC<FeatruesSliderProps> = ({
  ideasData,
  productsData,
  professionals,
  suppliers,
}) => {
  const router = useRouter();

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  const lang = useLanguage();
  const [next, setNext] = useState<
    "Ideas" | "Products" | "Suppliers" | "Professionals"
  >("Ideas");
  const mapData = (data: []) =>
    data?.map(({ id, business_name, logo, user }) => ({
      id,
      business_name,
      logo,
      user,
    }));

  const dataMap = {
    Ideas: ideasData?.payload.data,
    Products: productsData?.payload.data,
    Professionals: mapData(professionals?.payload.data),
    Suppliers: mapData(suppliers?.payload.data),
  };

  const links = {
    Ideas: "/idea",
    Products: "/products",
    Professionals: "/business-user",
    Suppliers: "/business-user",
  };
  const redirects = {
    Ideas: "/ideas-services",
    Products: `/shop-products/${753}`,
    Professionals: `/professionals-categories/${696}`,
    Suppliers: "/business-user",
  };

  const data = dataMap[next];
  const link = links[next];
  const redirect = redirects[next];

  return (
    <div className="py-10">
      <SharedTitle text="CraftScene" />
      <TextContainer
        next={next}
        setNext={setNext as React.Dispatch<React.SetStateAction<string>>}
      />
      <div className="relative w-full h-[300px] mx-auto my-2">
        {data && (
          <Swiper
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 15 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
              1280: { slidesPerView: 5, spaceBetween: 25 },
            }}
            spaceBetween={10}
            navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {Array.isArray(data) &&
              data.map((item, index) => (
                <SwiperSlide
                  className=" cursor-pointer"
                  key={item.id}
                  onClick={() =>
                    handleCardClick(
                      next === "Professionals" || next === "Suppliers"
                        ? link + "/" + item.user.id
                        : link + "/" + item.id
                    )
                  }
                >
                  <CustomImage
                    src={item?.images?.[0]?.url || item.logo || "/default.png"}
                    alt={item.business_name || `Slide ${index + 1}`}
                    width={500}
                    height={225}
                    className="w-full h-[225px] object-cover rounded-lg"
                  />
                  <Text className="text-center mt-2 text-lg font-medium">
                    {item[`title_${lang}`] ||
                      item[`title_en`] ||
                      item.business_name}
                  </Text>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
        <button
          data-testid="custom-prev"
          className="custom-prev absolute top-[40%] left-0 md:-left-6 transform -translate-y-1/2 text-3xl text-slate-900 bg-slate-200 rounded-full p-2 shadow-md hover:bg-main hover:text-white duration-300 z-20 disabled:opacity-50"
        >
          <AiOutlineLeft />
        </button>
        <button
          data-testid="custom-next"
          className="custom-next absolute top-[40%] right-0 md:-right-6 transform -translate-y-1/2 text-3xl text-slate-900 bg-slate-200 rounded-full p-2 shadow-md hover:bg-main hover:text-white duration-300 z-20 disabled:opacity-50"
        >
          <AiOutlineRight />
        </button>
      </div>
      <div className="w-fit mx-auto">
        <Link href={redirect}>
          <Button variant="main">See More</Button>
        </Link>
      </div>
    </div>
  );
};

export default FeatruesSlider;
