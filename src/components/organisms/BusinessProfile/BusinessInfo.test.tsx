import React from "react";

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BusinessInfo from "./BusinessInfo";
import { USER_TYPE } from "../../../constants/constants";
import { UserProvider } from "../../../context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: vi.fn(() => "en"),
}));

vi.mock("@/utils/generalUtils", () => ({
  findLabelByValue: vi.fn((value: string | number) => {
    return (
      USER_TYPE.find((type) => String(type.value) === String(value))?.label ||
      "Unknown"
    );
  }),
}));

const mockBusinessInfo: any = {
  user: { user_type: "admin" },
  business_name: "Mock Business",
  logo: "https://example.com/logo.png",
  profile: "https://example.com/profile.png",
  city: {
    country: { name_en: "United States", name_es: "Estados Unidos" },
    name_en: "New York",
    name_es: "Nueva York",
  },
};

const queryClient = new QueryClient();

describe("BusinessInfo Component", () => {
  it("renders the profile image", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BusinessInfo businessInfo={mockBusinessInfo} />
        </UserProvider>
      </QueryClientProvider>
    );

    const profileImage = screen.getByAltText(
      "bon ton logo"
    ) as HTMLImageElement;
    expect(profileImage.getAttribute("src")).toContain(
      encodeURIComponent(mockBusinessInfo.logo)
    );
  });

  it("displays the business name", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BusinessInfo businessInfo={mockBusinessInfo} />
        </UserProvider>
      </QueryClientProvider>
    );

    const businessNameElement = screen.getByText(
      mockBusinessInfo.business_name
    );
    expect(businessNameElement).toBeDefined();
  });

  it("renders the location (country and city)", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BusinessInfo businessInfo={mockBusinessInfo} />
        </UserProvider>
      </QueryClientProvider>
    );

    const location = `${mockBusinessInfo.city.country.name_en}, ${mockBusinessInfo.city.name_en}`;
    expect(screen.getByText(location)).toBeDefined();
  });
});
