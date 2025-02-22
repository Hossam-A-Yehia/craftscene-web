import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";
import { vi } from "vitest";
import React from "react";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

describe("About Component", () => {
  const defaultBusinessInfo: any = {
    accomplished_projects_count: 10,
    phone: "123-456-7890",
    business_email: "test@example.com",
    years_of_experience: 5,
    number_of_employees: 50,
    price_range: "2",
    volume_of_work: "3",
    classifications: [
      { id: 1, classification: "class1" },
      { id: 2, classification: "class2" },
    ],
    user: {
      user_type: 4,
    },
  };

  it("renders all info cards when complete business info is provided", () => {
    render(<About businessInfo={defaultBusinessInfo} />);

    expect(screen.getByTestId("projects-card")).toBeDefined();
    expect(screen.getByTestId("phone-card")).toBeDefined();
    expect(screen.getByTestId("email-card")).toBeDefined();
    expect(screen.getByTestId("experience-card")).toBeDefined();
    expect(screen.getByTestId("employees-card")).toBeDefined();
    expect(screen.getByTestId("price-range-card")).toBeDefined();
    expect(screen.getByTestId("volume-card")).toBeDefined();
  });

  it("hides accomplished projects count for supplier type", () => {
    const supplierInfo = {
      ...defaultBusinessInfo,
      user: { user_type: 6 },
    };
    render(<About businessInfo={supplierInfo} />);

    expect(screen.queryByTestId("projects-card")).toBeNull();
  });

  it("hides number of employees for freelance type", () => {
    const freelanceInfo = {
      ...defaultBusinessInfo,
      user: { user_type: 2 },
    };
    render(<About businessInfo={freelanceInfo} />);

    expect(screen.queryByTestId("employees-card")).toBeNull();
  });

  it("renders contractor classifications correctly", () => {
    const contractorInfo = {
      ...defaultBusinessInfo,
      user: { user_type: 4 },
    };
    render(<About businessInfo={contractorInfo} />);

    expect(screen.getByTestId("classifications-section")).toBeDefined();
    expect(screen.getByTestId("classification-1")).toBeDefined();
    expect(screen.getByTestId("classification-2")).toBeDefined();
  });

  it("renders supplier classifications correctly", () => {
    const supplierInfo = {
      ...defaultBusinessInfo,
      user: { user_type: 6 },
    };
    render(<About businessInfo={supplierInfo} />);

    expect(screen.getByTestId("classifications-section")).toBeDefined();
    expect(screen.getByTestId("classification-1")).toBeDefined();
    expect(screen.getByTestId("classification-2")).toBeDefined();
  });

  it("handles missing optional fields gracefully", () => {
    const partialInfo: any = {
      business_email: "test@example.com",
      classifications: [],
      user: { user_type: 4 },
    };
    render(<About businessInfo={partialInfo} />);

    expect(screen.getByTestId("email-card")).toBeDefined();
    expect(screen.queryByTestId("phone-card")).toBeNull();
    expect(screen.queryByTestId("experience-card")).toBeNull();
    expect(screen.queryByTestId("classifications-section")).toBeNull();
  });

  it("renders all card titles correctly", () => {
    render(<About businessInfo={defaultBusinessInfo} />);
    const cardTitles = screen.getAllByTestId(/^card-title-/);
    expect(cardTitles).toHaveLength(7);
    cardTitles.forEach((title) => {
      expect(title).toHaveTextContent(/^business_profile\./);
    });
  });
});
