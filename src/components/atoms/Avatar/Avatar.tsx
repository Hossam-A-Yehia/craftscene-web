import React from "react";
import CustomImage from "../Image/CustomImage";

type AvatarProps = {
  src: string;
  alt: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => (
  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden relative">
    <CustomImage fill src={src} alt={alt} />
  </div>
);

export default Avatar;
