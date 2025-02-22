"use client";
import React from "react";
import Text from "../Text/Text";

export default function Head({
  title,
  desc,
  categoryTitle,
}: {
  title: string;
  desc: string;
  categoryTitle: string;
}) {
  return (
    <>
      <div className="flex items-center mx-auto justify-center gap-2 mb-4">
        <Text className="text-3xl font-bold text-center ">{title}</Text>
        {categoryTitle && (
          <Text className="text-xl font-bold text-center ">
            ({categoryTitle})
          </Text>
        )}
      </div>
      <Text className="text-center mb-8">{desc}</Text>
    </>
  );
}
