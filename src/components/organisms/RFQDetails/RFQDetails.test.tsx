import { render, screen } from "@testing-library/react";
import RFQDetails from "./RFQDetails";
import { RFPStatusEnum } from "../../../constants/constants";
import { useLanguage } from "../../../hooks/useLanguage";
import { expect, vi } from "vitest";
import React from "react";

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: vi.fn(() => "en"),
}));

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

describe("RFQDetails", () => {
  const mockRFQ: any = {
    id: 1,
    subject: "Test Subject",
    description: "Test Description",
    status: RFPStatusEnum.Pending,
    created_at: "2023-10-01T12:00:00Z",
    service: {
      category: {
        name_en: "Test Category",
        name_ar: "فئة الاختبار",
      },
      name_en: "Test Service",
      name_ar: "خدمة الاختبار",
    },
    files: [
      {
        id: 1,
        type: "pdf",
        url: "http://example.com/file.pdf",
      },
    ],
  };

  it("renders the RFQDetails component with correct data", () => {
    render(<RFQDetails rfq={mockRFQ} />);
    expect(screen.getByTestId("rfq-subject-label")).toBeDefined();
    expect(screen.getByTestId("rfq-subject-value")).toBeDefined();
    expect(screen.getByTestId("rfq-description-label")).toBeDefined();
    expect(screen.getByTestId("rfq-description-value")).toBeDefined();
    expect(screen.getByTestId("rfq-category-label")).toBeDefined();
    expect(screen.getByTestId("rfq-category-value")).toBeDefined();
    expect(screen.getByTestId("rfq-service-label")).toBeDefined();
    expect(screen.getByTestId("rfq-service-value")).toBeDefined();
    expect(screen.getByTestId("rfq-created-at-label")).toBeDefined();
    expect(screen.getByTestId("rfq-created-at-value")).toBeDefined();
    expect(screen.getByTestId("rfq-files-label")).toBeDefined();
    expect(screen.getByTestId("rfq-file-1")).toBeDefined();
    expect(screen.getByTestId("rfq-file-link-1")).toHaveAttribute(
      "href",
      "http://example.com/file.pdf"
    );
  });

  it("displays the correct status label and color", () => {
    render(<RFQDetails rfq={mockRFQ} />);
    const statusLabel = screen.getByTestId("rfq-status-label");
    expect(statusLabel).toHaveClass("bg-gray-100 text-gray-600");
  });

  it("displays 'No files available' when files array is empty", () => {
    const rfqWithoutFiles = { ...mockRFQ, files: [] };
    render(<RFQDetails rfq={rfqWithoutFiles} />);
    expect(screen.getByTestId("rfq-no-files")).toBeDefined();
  });

  it("renders the category and service in the correct language (EN)", () => {
    (useLanguage as any).mockReturnValue("ar");
    render(<RFQDetails rfq={mockRFQ} />);
    expect(screen.getByTestId("rfq-category-value")).toHaveTextContent(
      "فئة الاختبار"
    );
    expect(screen.getByTestId("rfq-service-value")).toHaveTextContent(
      "خدمة الاختبار"
    );
  });
  it("renders the category and service in the correct language (EN)", () => {
    (useLanguage as any).mockReturnValue("en");
    render(<RFQDetails rfq={mockRFQ} />);
    expect(screen.getByTestId("rfq-category-value")).toHaveTextContent(
      "Test Category"
    );
    expect(screen.getByTestId("rfq-service-value")).toHaveTextContent(
      "Test Service"
    );
  });
});
