import { render, screen } from "@testing-library/react";
import AdsSection from "./AdsSection";
import { Ad } from "../../../types/Ads";
import { describe, it, expect } from "vitest";
import React from "react";

describe("AdsSection", () => {
  const ads = [
    { id: 1, images: [{ url: "/image1.jpg" }] },
    { id: 2, images: [{ url: "/image2.jpg" }] },
  ] as Ad[];

  it("should render without crashing", () => {
    render(<AdsSection ads={ads} />);
    expect(screen.getByLabelText("Previous Slide")).toBeDefined();
    expect(screen.getByLabelText("Next Slide")).toBeDefined();
  });

  it("should render the correct number of slides", () => {
    render(<AdsSection ads={ads} />);
    const slides = screen.getAllByRole("img");
    expect(slides).toHaveLength(ads.length);
  });
});
