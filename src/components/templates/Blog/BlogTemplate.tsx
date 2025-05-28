"use client";

import Image from "next/image";
import React, { FC, useCallback, useEffect, useState } from "react";
import Text from "@/components/atoms/Text/Text";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import ShareModal from "@/components/organisms/Modals/ShareModal/ShareModal";
import { useTranslation } from "react-i18next";
import { useLike } from "@/hooks/useLike";

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
  created_at: string;
  tags: string[];
}

interface BlogTemplateProps {
  blogs: Blog[];
}

const BlogTemplate: FC<BlogTemplateProps> = ({ blogs }) => {
  const { t } = useTranslation();
  const blog = blogs[0];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationPathname, setLocationPathname] = useState("");

  const toggleShareModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocationPathname(window.location.pathname);
    }
  }, []);

  const {
    isLiked,
    likes,
    isLikesLoading,
    isPendingAddLike,
    isPendingRemoveLike,
    handleLike,
  } = useLike(blog.id, "Post");

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Text className="text-2xl text-gray-500">Blog not found</Text>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Featured Image */}
        {blog.images?.[0]?.url && (
          <div className="h-[300px] md:h-[450px] relative w-full">
            <Image
              src={blog.images[0].url}
              alt={blog.title_en}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {blog.title_en}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-6">
            <div>
              <span className="font-semibold text-gray-700">Service:</span>{" "}
              {blog.service.name_en}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Location:</span>{" "}
              {blog.city.name_en}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Date:</span>{" "}
              {new Date(blog.created_at).toLocaleDateString()}
            </div>
          </div>

          {/* Description */}
          <div className="text-gray-700 leading-relaxed mb-8">
            <p>{blog.description_en}</p>
          </div>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-primary mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share & Like Section */}
          <div className="border-t pt-6 flex items-center justify-between text-gray-600">
            <div className="flex items-center gap-4">
              <button
                disabled={
                  isLikesLoading || isPendingAddLike || isPendingRemoveLike
                }
                onClick={handleLike}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-100 opacity-70 hover:opacity-100 text-black rounded-lg duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={isLiked ? "Unlike" : "Like"}
              >
                {isLikesLoading ? (
                  <span className="mr-3 size-5 animate-spin">.</span>
                ) : (
                  <span className="flex items-center gap-2 justify-between">
                    {isLiked ? (
                      <FaHeart className="text-lg text-main" />
                    ) : (
                      <FaRegHeart className="text-lg" />
                    )}
                    {likes?.length}
                  </span>
                )}
              </button>

              <button
                className="flex items-center space-x-2 px-4 py-2 bg-slate-100 opacity-70 hover:opacity-100 text-black rounded-lg duration-300 disabled:cursor-not-allowed disabled:opacity-50 transition"
                onClick={toggleShareModal}
              >
                <CiShare2 size={18} />
                <span>Share</span>
              </button>
            </div>

            <Text className="text-sm text-gray-400">Thanks for reading!</Text>
          </div>
        </div>
      </div>
      {locationPathname && (
        <ShareModal
          url={locationPathname}
          shareTitle={t("share.blog")}
          img={blog.images[0].url || "/default.png"}
          isOpen={isModalOpen}
          onCancel={toggleShareModal}
        />
      )}
    </div>
  );
};

export default BlogTemplate;
