import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, vi } from "vitest";
import FeatruesSlider from "./FeatruesSlider";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock("swiper/modules", () => ({
  Pagination: vi.fn(),
  Navigation: vi.fn(),
}));

describe("FeatruesSlider Component", () => {
  const mockPush = vi.fn();

  const ideasData = {
    payload: {
      data: [
        {
          id: "1",
          title_en: "Idea 1",
          title_es: "Idea Uno",
          images: [{ url: "/image1.png" }],
        },
        {
          id: "2",
          title_en: "Idea 2",
          title_es: "Idea Dos",
          images: [{ url: "/image2.png" }],
        },
      ],
    },
  };

  const productsData = { payload: { data: [] } };
  const professionals = { payload: { data: [] } };
  const suppliers = { payload: { data: [] } };

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders SharedTitle and TextContainer components", () => {
    render(
      <FeatruesSlider
        ideasData={ideasData}
        productsData={productsData}
        professionals={professionals}
        suppliers={suppliers}
      />
    );

    expect(screen.getByText("CraftScene")).toBeInTheDocument();
  });

  it("displays SwiperSlide components for ideas data", () => {
    render(
      <FeatruesSlider
        ideasData={ideasData}
        productsData={productsData}
        professionals={professionals}
        suppliers={suppliers}
      />
    );

    const slides = screen.getAllByText(/Idea/);
    expect(slides).toHaveLength(2);
  });

  it("displays the correct text based on the language", () => {
    vi.mock("@/hooks/useLanguage", () => ({
      useLanguage: () => "es",
    }));

    render(
      <FeatruesSlider
        ideasData={ideasData}
        productsData={productsData}
        professionals={professionals}
        suppliers={suppliers}
      />
    );

    expect(screen.getByText("Idea Uno")).toBeInTheDocument();
  });

  it("renders navigation buttons and handles clicks", () => {
    render(
      <FeatruesSlider
        ideasData={ideasData}
        productsData={productsData}
        professionals={professionals}
        suppliers={suppliers}
      />
    );

    const prevButton = screen.getByTestId("custom-prev");
    const nextButton = screen.getByTestId("custom-next");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
  });
});
