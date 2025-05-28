"use client";
import Image from "next/image";
import React, { FC } from "react";
import SharedTitle from "@/components/molecules/home/SharedTitle/SharedTitle";
import Text from "@/components/atoms/Text/Text";
import NavLink from "@/components/atoms/NavLink/NavLink";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Blog {
  id: number;
  title_en: string;
  description_en: string;
  title_ar: string;
  description_ar: string;
  service: {
    name_en: string;
    name_ar: string;
  };
  city: {
    name_en: string;
    name_ar: string;
  };
  images: any[];
}


const BlogsSection: FC<{ blogs: Blog[] }> = ({ blogs }) => {
  const {t} = useTranslation();
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="py-10">
      <SharedTitle text={t("home.blogs.title")} />
      <div className="mt-10 relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="blogs-swiper"
        >
          {blogs.map((blog: Blog) => (
            <SwiperSlide key={blog.id}>
              <div className="block transition-transform hover:scale-[1.02]">
                <NavLink href={`/blogs/${blog.id}`}>
                  <div className="bg-white text-start rounded-lg shadow-md overflow-hidden h-full">
                    {blog.images && blog.images[0] && (
                      <Image
                        src={blog.images[0].url || '/placeholder-image.jpg'}
                        alt={blog.title_en}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="px-4 py-4">
                      <Text className="text-lg font-medium mb-2 line-clamp-2">{truncateText(blog.title_en, 25)}</Text>
                      <Text className="text-gray-700 text-xs mb-4 line-clamp-3">
                        {truncateText(blog.description_en, 100)}
                      </Text>
                      <div className="flex flex-col gap-2 text-xs border-t pt-3">
                        <div className="flex items-center gap-2">
                          <span className="text-black font-bold">Service:</span>
                          <Text className="text-gray-500">{truncateText(blog.service.name_en, 20)}</Text>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-black font-bold">City:</span>
                          <Text className="text-gray-500">{truncateText(blog.city.name_en, 20)}</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev !w-10 !h-10 !bg-white !rounded-full !shadow-md after:!text-black after:!text-xl"></div>
          <div className="swiper-button-next !w-10 !h-10 !bg-white !rounded-full !shadow-md after:!text-black after:!text-xl"></div>
        </Swiper>
      </div>
      <style jsx global>{`
        .blogs-swiper {
          padding: 0 40px;
        }
        .swiper-button-prev,
        .swiper-button-next {
          color: #000;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 20px;
          color: #000;
        }
        .swiper-button-prev {
          left: 0;
        }
        .swiper-button-next {
          right: 0;
        }
        .swiper-button-disabled {
          opacity: 0.35;
          cursor: auto;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default BlogsSection;
