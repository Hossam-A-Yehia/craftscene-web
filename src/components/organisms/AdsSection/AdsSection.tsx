"use client";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import { Navigation, Autoplay } from "swiper/modules";
import CustomImage from "@/components/atoms/Image/CustomImage";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Ad } from "@/types/Ads";

export default function AdsSection({ ads }: { ads: Ad[] }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);

  const [swiperInitialized, setSwiperInitialized] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      setSwiperInitialized(true);
    }
  }, []);

  return (
    <div id="app" className="h-[300px] relative">
      <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={
          swiperInitialized
            ? { prevEl: prevRef.current, nextEl: nextRef.current }
            : false
        }
        modules={[Navigation, Autoplay]}
        className="slider-container z-20 relative"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setSwiperInitialized(true);
        }}
      >
        {ads?.map((ads: Ad) => (
          <SwiperSlide
            key={ads.id}
            className="slider-slide relative w-full pt-3"
          >
            <CustomImage src={ads.images[0].url} alt="Hello" fill />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        aria-label="Previous Slide"
        ref={prevRef}
        className="custom-prev absolute top-[50%] left-0 md:left-[50px] transform -translate-y-1/2 text-4xl text-slate-200 rounded-full p-2 shadow-md hover:bg-main duration-300 z-30 disabled:opacity-50"
      >
        <AiOutlineLeft />
      </button>
      <button
        aria-label="Next Slide"
        ref={nextRef}
        className="custom-next absolute top-[50%] right-0 md:right-[50px] transform -translate-y-1/2 text-4xl text-slate-200 rounded-full p-2 shadow-md hover:bg-main duration-300 z-30 disabled:opacity-50"
      >
        <AiOutlineRight />
      </button>
    </div>
  );
}
