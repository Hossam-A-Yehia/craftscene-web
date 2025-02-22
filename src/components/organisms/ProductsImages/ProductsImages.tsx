"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import "./styles-pro.css";
import { ProductVariant } from "@/types/Products";
import CustomImage from "@/components/atoms/Image/CustomImage";

const ProductsImages = ({
  currentVariant,
}: {
  currentVariant: ProductVariant[];
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex % currentVariant[0]?.image_urls.length);
  };

  const renderSlides = (className: string) => {
    if (
      !currentVariant[0]?.image_urls ||
      currentVariant[0].image_urls.length === 0
    ) {
      return (
        <SwiperSlide>
          <div className="flex items-center justify-center h-full text-gray-500">
            <CustomImage src={"/outOfStock.jpg"} fill alt={`kj`} />
          </div>
        </SwiperSlide>
      );
    }
    return currentVariant[0].image_urls.map((image, index) => (
      <SwiperSlide key={index}>
        <div className={`${className} relative`}>
          <CustomImage
            src={image}
            fill
            alt={`Slide ${index + 1}`}
            className={`${activeIndex === index ? "active" : ""}`}
          />
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <div className="relative packages">
      <Swiper
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Autoplay]}
        onSlideChange={handleSlideChange}
        className="mySwiper2"
      >
        {renderSlides("h-[300px] md:h-full w-full")}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-4"
      >
        {renderSlides("min-h-[80px] max-h-[80px]")}
      </Swiper>
    </div>
  );
};

export default ProductsImages;
