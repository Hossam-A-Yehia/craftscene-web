"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import { Navigation, Autoplay } from "swiper/modules";
import CustomImage from "@/components/atoms/Image/CustomImage";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Idea } from "@/types/idea";
import { FaHeart, FaRegHeart, FaShare } from "react-icons/fa";
import { CgMaximizeAlt } from "react-icons/cg";
import { t } from "i18next";

import ImageOverlay from "@/components/molecules/ImageOverlay/ImageOverlay";
import ShareModal from "../../Modals/ShareModal/ShareModal";
import { useLike } from "@/hooks/useLike";

export default function ImageCard({ data }: { data: Idea }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);

  const {
    isLiked,
    likes,
    isLikesLoading,
    isPendingAddLike,
    isPendingRemoveLike,
    handleLike,
  } = useLike(data?.id, "UserIdea");

  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationPathname, setLocationPathname] = useState("");


  const handleShareClick = () => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.realIndex;
      const image = data?.images[currentIndex];
      if (image) {
        setCurrentImage(image.url);
        setOverlayVisible(true);
      }
    }
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      setSwiperInitialized(true);
    }
  }, [data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocationPathname(window.location.pathname);
    }
  }, []);

  const toggleShareModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  return (
    <div
      id="app"
      className="h-[300px] md:h-full col-span-3 bg-gray-200 px-[100px] relative"
    >
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
        className="slider-container"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {data?.images?.map((img, index) => (
          <SwiperSlide
            key={index}
            className="slider-slide relative w-full pt-3"
          >
            <CustomImage src={img.url} alt={img.title} fill />
            <button
              onClick={toggleShareModal}
              className="absolute bottom-3 left-10 z-20 flex items-center space-x-2 px-4 py-2 bg-white opacity-70 hover:opacity-100 text-black rounded-lg duration-300"
              aria-label="Share"
            >
              <FaShare className="text-lg text-black rtl:ml-2" />
              <span className="hidden lg:block">{t("idea.share")}</span>
            </button>
            <button
              disabled={
                isLikesLoading || isPendingAddLike || isPendingRemoveLike
              }
              onClick={handleLike}
              className="absolute bottom-3 right-10 z-20 flex items-center space-x-2 px-4 py-2 bg-white opacity-70 hover:opacity-100 text-black rounded-lg duration-300 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              {isLikesLoading ? (
                <span className="mr-3 size-5 animate-spin">.</span>
              ) : (
                <span className="flex items-center gap-2">
                  {isLiked ? (
                    <FaHeart className="text-lg text-main" />
                  ) : (
                    <FaRegHeart className="text-lg" />
                  )}
                  {likes?.length}
                </span>
              )}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={handleShareClick}
        className="absolute shadow-lg bottom-3 left-3 z-20 p-4 text-black hover:text-white bg-white hover:bg-main rounded-lg duration-300"
        aria-label="Maximize"
      >
        <CgMaximizeAlt className="text-lg" />
      </button>
      {data?.images.length > 1 && (
        <>
          <button
            aria-label="Previous Slide"
            ref={prevRef}
            className="custom-prev absolute top-[50%] left-0 md:left-[50px] transform -translate-y-1/2 text-3xl text-slate-900 bg-white rounded-full p-2 shadow-md hover:bg-main hover:text-white duration-300 z-20 disabled:opacity-50"
          >
            <AiOutlineLeft />
          </button>
          <button
            aria-label="Next Slide"
            ref={nextRef}
            className="custom-next absolute top-[50%] right-0 md:right-[50px] transform -translate-y-1/2 text-3xl text-slate-900 bg-white rounded-full p-2 shadow-md hover:bg-main hover:text-white duration-300 z-20 disabled:opacity-50"
          >
            <AiOutlineRight />
          </button>
        </>
      )}
      {overlayVisible && (
        <ImageOverlay
          src={currentImage}
          alt="idea"
          onClose={handleCloseOverlay}
        />
      )}
      {locationPathname && (
        <ShareModal
          url={locationPathname}
          shareTitle={t("share.idea")}
          img={data?.images[0].url}
          isOpen={isModalOpen}
          onCancel={toggleShareModal}
        />
      )}
    </div>
  );
}
