import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import ImageCard from "./ImageCard";
import { Idea } from "../../../../types/idea";
import { expect, vi } from "vitest";
import { UserProvider } from "../../../../context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "idea.share": "Share",
        "idea.save": "Save",
      };
      return translations[key] || key;
    },
  }),
}));

const queryClient = new QueryClient();

describe("ImageCard Component", () => {
  const mockData: Idea = {
    images: [
      {
        url: "https://example.com/image1.jpg",
        title: "Image 1",
        id: 0,
      },
      {
        url: "https://example.com/image2.jpg",
        title: "Image 2",
        id: 0,
      },
    ],
    user: {
      business_user_detail: {
        profile: "",
        business_name: "",
      },
      id: 0,
      username: "",
    },
    length: 0,
    id: 0,
    title_en: "",
    description_en: "",
    title_ar: "",
    description_ar: "",
    user_service_id: 0,
    user_project_id: 0,
    values: [],
    map: undefined,
    service: undefined,
  };

  it("renders the component and shows the first image", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ImageCard data={mockData} />
        </UserProvider>
      </QueryClientProvider>
    );
    expect(screen.getByAltText("Image 1")).toBeInTheDocument();
  });

  it("renders navigation buttons when there are multiple images", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ImageCard data={mockData} />
        </UserProvider>
      </QueryClientProvider>
    );
    expect(
      screen.getByRole("button", { name: /previous slide/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /next slide/i })
    ).toBeInTheDocument();
  });

  it("does not render navigation buttons when there is only one image", () => {
    const singleImageData: Idea = {
      ...mockData,
      images: [
        {
          url: "https://example.com/image1.jpg",
          title: "Image 1",
          id: 0,
        },
      ],
    };
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ImageCard data={singleImageData} />
        </UserProvider>
      </QueryClientProvider>
    );
    expect(
      screen.queryByRole("button", { name: /left/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /right/i })
    ).not.toBeInTheDocument();
  });

  it("opens overlay with the correct image when the share button is clicked", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ImageCard data={mockData} />
        </UserProvider>
      </QueryClientProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: /maximize/i }));
    expect(screen.getByAltText("idea")).toBeInTheDocument();
  });
});
