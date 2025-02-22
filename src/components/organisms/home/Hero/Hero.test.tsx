import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import Hero from "./Hero";
import React from "react";

vi.mock("i18next", () => ({
  t: (key) => key,
}));

describe("Hero Component", () => {
  it("renders the Hero component correctly", () => {
    render(<Hero />);
    expect(screen.getByText("home.hero.title")).toBeInTheDocument();
    expect(screen.getByText("home.hero.desc")).toBeInTheDocument();
    const buttonElement = screen.getByTestId("hero-button");
    expect(buttonElement).toBeInTheDocument();
  });
});
