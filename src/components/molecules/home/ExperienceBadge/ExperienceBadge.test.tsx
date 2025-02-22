import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import ExperienceBadge from "./ExperienceBadge";
import React from "react";

vi.mock("next/font/google", () => ({
  Allura: () => ({
    className: "mock-allura-class",
  }),
}));

describe("ExperienceBadge Component", () => {
  it("renders the experience number correctly", () => {
    render(<ExperienceBadge />);

    const experienceNumber = screen.getByTestId("experience-number");
    expect(experienceNumber).toBeInTheDocument();
    expect(experienceNumber).toHaveTextContent("10");
  });

  it("renders the experience text correctly", () => {
    render(<ExperienceBadge />);

    const experienceText = screen.getByTestId("experience-text");
    expect(experienceText).toBeInTheDocument();
    expect(experienceText).toHaveTextContent("Years of experience");
  });

  it("applies the correct class for the experience text", () => {
    render(<ExperienceBadge />);

    const experienceText = screen.getByTestId("experience-text");
    expect(experienceText).toHaveClass("text-2xl");
    expect(experienceText).toHaveClass("ml-2");
    expect(experienceText).toHaveClass("mock-allura-class");
  });

  it("applies the correct styles to the badge", () => {
    render(<ExperienceBadge />);

    const experienceBadge = screen.getByTestId("experience-badge");
    expect(experienceBadge).toHaveClass("bg-main");
    expect(experienceBadge).toHaveClass("text-white");
    expect(experienceBadge).toHaveClass("text-lg");
    expect(experienceBadge).toHaveClass("p-4");
    expect(experienceBadge).toHaveClass("w-full");
    expect(experienceBadge).toHaveClass("mt-8");
    expect(experienceBadge).toHaveClass("flex");
    expect(experienceBadge).toHaveClass("items-center");
    expect(experienceBadge).toHaveClass("gap-3");
  });
});
