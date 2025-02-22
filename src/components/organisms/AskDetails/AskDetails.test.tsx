import { render, screen } from "@testing-library/react";
import AskDetails from "./AskDetails";
import { useLanguage } from "../../../hooks/useLanguage";
import { expect, vi } from "vitest";
import React from "react";

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: vi.fn(() => "en"),
}));

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

describe("AskDetails", () => {
  const mockAsk: any = {
    id: 1,
    title: "Test title",
    description: "Test Description",
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

  it("renders the AskDetails component with correct data", () => {
    render(<AskDetails ask={mockAsk} />);
    expect(screen.getByTestId("ask-subject-label")).toBeDefined();
    expect(screen.getByTestId("ask-subject-value")).toBeDefined();
    expect(screen.getByTestId("ask-description-label")).toBeDefined();
    expect(screen.getByTestId("ask-description-value")).toBeDefined();
    expect(screen.getByTestId("ask-category-label")).toBeDefined();
    expect(screen.getByTestId("ask-category-value")).toBeDefined();
    expect(screen.getByTestId("ask-service-label")).toBeDefined();
    expect(screen.getByTestId("ask-service-value")).toBeDefined();
    expect(screen.getByTestId("ask-created-at-label")).toBeDefined();
    expect(screen.getByTestId("ask-created-at-value")).toBeDefined();
    expect(screen.getByTestId("ask-files-label")).toBeDefined();
    expect(screen.getByTestId("ask-file-1")).toBeDefined();
    expect(screen.getByTestId("ask-file-link-1")).toHaveAttribute(
      "href",
      "http://example.com/file.pdf"
    );
  });

  it("displays 'No files available' when files array is empty", () => {
    const askWithoutFiles = { ...mockAsk, files: [] };
    render(<AskDetails ask={askWithoutFiles} />);
    expect(screen.getByTestId("ask-no-files")).toBeDefined();
  });

  it("renders the category and service in the correct language (EN)", () => {
    (useLanguage as any).mockReturnValue("ar");
    render(<AskDetails ask={mockAsk} />);
    expect(screen.getByTestId("ask-category-value")).toHaveTextContent(
      "فئة الاختبار"
    );
    expect(screen.getByTestId("ask-service-value")).toHaveTextContent(
      "خدمة الاختبار"
    );
  });
  it("renders the category and service in the correct language (EN)", () => {
    (useLanguage as any).mockReturnValue("en");
    render(<AskDetails ask={mockAsk} />);
    expect(screen.getByTestId("ask-category-value")).toHaveTextContent(
      "Test Category"
    );
    expect(screen.getByTestId("ask-service-value")).toHaveTextContent(
      "Test Service"
    );
  });
});
