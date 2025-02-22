import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RFQs from "./RFQsGrid";
import React from "react";

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: () => "en",
}));

vi.mock("@/components/molecules/NoDate/NoData", () => ({
  default: () => <div data-testid="no-data-component">No Data</div>,
}));

vi.mock("@/components/molecules/RFQsCard/RFQsCard", () => ({
  default: ({ id, status, subject, service, category }) => (
    <div data-testid={`rfq-card-${id}`}>
      <span data-testid={`rfq-status-${id}`}>{status}</span>
      <span data-testid={`rfq-subject-${id}`}>{subject}</span>
      <span data-testid={`rfq-service-${id}`}>{service}</span>
      <span data-testid={`rfq-category-${id}`}>{category}</span>
    </div>
  ),
}));

describe("RFQs Component", () => {
  const mockRFQs = [
    {
      id: "1",
      status: "pending",
      created_at: "2024-01-27",
      subject: "Test RFQ 1",
      service: {
        name_en: "Service 1",
        name_ar: "خدمة 1",
        category: {
          name_en: "Category 1",
          name_ar: "فئة 1",
        },
      },
    },
    {
      id: "2",
      status: "completed",
      created_at: "2024-01-28",
      subject: "Test RFQ 2",
      service: {
        name_en: "Service 2",
        name_ar: "خدمة 2",
        category: {
          name_en: "Category 2",
          name_ar: "فئة 2",
        },
      },
    },
  ];

  it("should render the rfq grid container", () => {
    render(<RFQs filteredRFQs={[]} isLoading={false} />);
    expect(screen.getByTestId("rfq-grid")).toBeDefined();
  });

  it("should render RFQ cards when data is provided", () => {
    render(<RFQs filteredRFQs={mockRFQs} isLoading={false} />);

    mockRFQs.forEach((rfq) => {
      expect(screen.getByTestId(`rfq-card-${rfq.id}`)).toBeDefined();
      expect(screen.getByTestId(`rfq-status-${rfq.id}`)).toHaveTextContent(
        rfq.status
      );
      expect(screen.getByTestId(`rfq-subject-${rfq.id}`)).toHaveTextContent(
        rfq.subject
      );
      expect(screen.getByTestId(`rfq-service-${rfq.id}`)).toHaveTextContent(
        rfq.service.name_en
      );
      expect(screen.getByTestId(`rfq-category-${rfq.id}`)).toHaveTextContent(
        rfq.service.category.name_en
      );
    });
  });

  it("should not render NoData component when loading", () => {
    render(<RFQs filteredRFQs={[]} isLoading={true} />);
    expect(screen.queryByTestId("no-data")).toBeNull();
  });

  it("should render NoData component when no RFQs and not loading", () => {
    render(<RFQs filteredRFQs={[]} isLoading={false} />);
    expect(screen.getByTestId("no-data")).toBeDefined();
  });

  it("should handle isInvitation prop correctly", () => {
    render(
      <RFQs filteredRFQs={mockRFQs} isLoading={false} isInvitation={true} />
    );
    mockRFQs.forEach((rfq) => {
      expect(screen.getByTestId(`rfq-card-${rfq.id}`)).toBeDefined();
    });
  });

  it("should handle empty array properly", () => {
    render(<RFQs filteredRFQs={[]} isLoading={false} />);
    expect(screen.getByTestId("no-data")).toBeDefined();
    expect(screen.queryByTestId("rfq-card-1")).toBeNull();
  });

  it("should handle null/undefined filteredRFQs properly", () => {
    render(<RFQs filteredRFQs={[]} isLoading={false} />);
    expect(screen.getByTestId("no-data")).toBeDefined();
  });
});
