import React from "react";
import { Allura } from "next/font/google";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
});

const ExperienceBadge = () => (
  <div
    data-testid="experience-badge"
    className="bg-main text-white text-lg p-4 w-full mt-8 flex items-center gap-3"
  >
    <span data-testid="experience-number" className="text-4xl font-bold">
      10
    </span>
    <div>
      <span
        data-testid="experience-text"
        className={`text-2xl ${allura.className} ml-2`}
      >
        Years <br /> of experience
      </span>
    </div>
  </div>
);

export default ExperienceBadge;
