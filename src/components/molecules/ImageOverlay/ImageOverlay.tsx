import CustomImage from "@/components/atoms/Image/CustomImage";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ImageOverlayProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({ src, alt, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 h-screen w-full flex justify-center items-center">
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black opacity-70
          ${
            isVisible
              ? "opacity-100 transition-opacity duration-500"
              : "opacity-0"
          }
        `}
        onClick={onClose}
      ></div>

      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-20">
        <div
          className={`relative w-3/5 h-4/5 ${
            isVisible ? "scale-100" : "scale-50"
          } 
          transition-transform duration-500`}
        >
          <CustomImage src={src} alt={alt} fill />
        </div>
      </div>

      <button
        className="absolute top-5 right-5 z-30 text-white text-xl bg-black bg-opacity-50 rounded-full p-3 
        hover:bg-opacity-70 transition-all duration-300 hover:bg-red-500"
        onClick={onClose}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default ImageOverlay;
