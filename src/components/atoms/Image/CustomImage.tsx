import { ImageProps } from "@/types/Atoms";
import Image from "next/image";
import React from "react";

const CustomImage: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  testId,
  layout,
  fill,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
      data-testid={testId}
      layout={layout}
      fill={fill}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

export default CustomImage;
