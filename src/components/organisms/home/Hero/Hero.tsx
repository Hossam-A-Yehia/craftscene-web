"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button/Button";
import { t } from "i18next";

const images = [
  "/home/hero1.jpg",
  "/home/hero4.jpg",
  "/home/hero3.jpg",
  "/home/hero4.jpg",
  "/home/hero1.jpg",
];
const texts = [
  {
    title: t("home.hero.title1"),
    desc: t("home.hero.desc1"),
  },
  {
    title: t("home.hero.title2"),
    desc: t("home.hero.desc2"),
  },
  {
    title: t("home.hero.title3"),
    desc: t("home.hero.desc3"),
  },
  {
    title: t("home.hero.title4"),
    desc: t("home.hero.desc4"),
  },
  {
    title: t("home.hero.title5"),
    desc: t("home.hero.desc5"),
  },
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-60px)] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      ))}

      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white md:w-2/3 w-100 mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          {texts[currentIndex].title}
        </h1>
        <p className="text-sm md:text-lg mt-2 text-slate-300">
          {texts[currentIndex].desc}
        </p>
        <div className="mt-5">
          <Button variant="main" dataTestid="hero-button">
            {t("home.hero.btn")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
