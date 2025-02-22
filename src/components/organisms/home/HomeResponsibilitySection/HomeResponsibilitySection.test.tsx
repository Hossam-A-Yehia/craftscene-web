import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import HomeResponsibilitySection from "./HomeResponsibilitySection";
import React from "react";

vi.mock("i18next", () => ({
  t: (key) => key,
}));
vi.mock("next/font/google", () => ({
  Allura: () => ({
    className: "mock-allura-class",
  }),
}));
describe("HomeResponsibilitySection", () => {
  it("renders the section and its elements correctly", () => {
    render(<HomeResponsibilitySection />);
    const section = screen.getByTestId("responsibility-section");
    expect(section).toBeInTheDocument();
    expect(screen.getByTestId("text-head")).toBeInTheDocument();
    expect(screen.getByTestId("text-title")).toBeInTheDocument();
    expect(screen.getByTestId("text-desc")).toBeInTheDocument();
    expect(screen.getByTestId("service-list")).toBeInTheDocument();
    const image = screen.getByTestId("responsibility-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("Responsibility.png")
    );
    const experienceBadge = screen.getByTestId("experience-badge");
    expect(experienceBadge).toBeInTheDocument();
  });

  it("has the correct styling and structure", () => {
    render(<HomeResponsibilitySection />);
    const section = screen.getByTestId("responsibility-section");
    expect(section).toHaveClass("bg-gray-200");
    const headText = screen.getByTestId("text-head");
    expect(headText).toHaveClass("text-md font-extrabold text-main");
    const titleText = screen.getByTestId("text-title");
    expect(titleText).toHaveClass("text-3xl font-bold text-main");
    const descText = screen.getByTestId("text-desc");
    expect(descText).toHaveClass("text-sm leading-6 text-slate-500");
    const imageContainer = screen.getByTestId("image-container");
    expect(imageContainer).toHaveClass(
      "relative mx-auto md:mx-0 md:ml-auto mt-10 md:mt-0"
    );
  });
  it("renders the ExperienceBadge component within the image container", () => {
    render(<HomeResponsibilitySection />);
    const experienceBadgeContainer = screen.getByTestId(
      "experience-badge-container"
    );
    expect(experienceBadgeContainer).toBeInTheDocument();
    const experienceBadge = screen.getByTestId("experience-badge");
    expect(experienceBadge).toBeInTheDocument();
  });
});
