"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import { Idea } from "@/types/idea";
import { FreeMode, Navigation } from "swiper/modules";
import Text from "@/components/atoms/Text/Text";
import Card from "@/components/molecules/Card/Card";
import NoDataSection from "@/components/molecules/NoDate/NoDate";
import { t } from "i18next";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import { useLanguage } from "@/hooks/useLanguage";

export default function Similar({
  data,
  title,
  link,
}: {
  data: Idea[];
  title: string;
  link: string;
}) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const lang = useLanguage();

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      setSwiperInitialized(true);
    }
  }, [prevRef, nextRef]);

  return (
    <>
      <div id="app" className="h-full relative">
        <Text className=" font-bold text-xl mb-3">{t(title)}</Text>
        {data?.length === 0 && <NoDataSection />}
        <Swiper
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode, Navigation]}
          navigation={
            swiperInitialized
              ? { prevEl: prevRef.current, nextEl: nextRef.current }
              : false
          }
          className="slider-container grid grid-cols-4"
        >
          {data?.map((item: Idea) => (
            <SwiperSlide key={item.id} className="slider-slide min-h-[200px] ">
              {link === "idea" ? (
                <Card
                  imageUrl={item.images[0]?.url}
                  altText={item.title_en}
                  link={`/${link}/${item.id}`}
                />
              ) : (
                <ProductCard
                  imageUrl={item.images[0]?.url}
                  altText={item.title_en}
                  link={`/${link}/${item.id}`}
                  title={item[`title_${lang}`] || item[`title_en`] || ""}
                  supplier={item.user.business_user_detail?.business_name}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          ref={prevRef}
          className="custom-prev absolute top-[55%] left-0 md:-left-6 transform -translate-y-1/2 text-3xl text-slate-900 bg-slate-200 rounded-full p-2 shadow-md hover:bg-main hover:text-white duration-300 z-20 disabled:opacity-50"
        >
          <AiOutlineLeft />
        </button>
        <button
          ref={nextRef}
          className="custom-next absolute top-[55%] right-0 md:-right-6 transform -translate-y-1/2 text-3xl text-slate-900 bg-slate-200 rounded-full p-2 shadow-md hover:bg-main hover:text-white duration-300 z-20 disabled:opacity-50"
        >
          <AiOutlineRight />
        </button>
      </div>
    </>
  );
}
