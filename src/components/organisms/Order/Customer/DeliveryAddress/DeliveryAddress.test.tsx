import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DeliveryAddress from "./DeliveryAddress";
import React from "react";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: () => "en",
}));

describe("DeliveryAddress Component", () => {
  const mockAddress = {
    street_address: "123 Test Street",
    city: {
      name_en: "Test City",
      name_ar: "مدينة الاختبار",
    },
    country: {
      name_en: "Test Country",
      name_ar: "بلد الاختبار",
    },
  };

  it("renders delivery address container", () => {
    render(<DeliveryAddress deliveryAddress={mockAddress} />);

    const container = screen.getByTestId("delivery-address-container");
    expect(container).toBeDefined();
  });

  it("displays correct title", () => {
    render(<DeliveryAddress deliveryAddress={mockAddress} />);

    const title = screen.getByTestId("delivery-title");
    expect(title).toBeDefined();
  });

  it("displays street address correctly", () => {
    render(<DeliveryAddress deliveryAddress={mockAddress} />);
    const addressTexts = screen.getAllByTestId("address-text");
    expect(addressTexts[0]).toBeDefined();
  });

  it("displays city and country in correct format", () => {
    render(<DeliveryAddress deliveryAddress={mockAddress} />);

    const addressTexts = screen.getAllByTestId("address-text");
    expect(addressTexts[1]).toBeDefined();
  });
});
