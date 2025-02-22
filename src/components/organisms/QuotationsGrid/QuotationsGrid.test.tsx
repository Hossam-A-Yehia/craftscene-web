import { render, screen } from "@testing-library/react";
import QuotationsGrid from "./QuotationsGrid";
import { RFQStatus } from "../../../constants/enums/rfqsEnum";
import React from "react";
import { expect, vi } from "vitest";

vi.mock("@/components/molecules/QuotationsCard/QuotationsCard", () => ({
  default: vi.fn(({ quotation }) => (
    <div data-testid="quotation-card">
      {quotation.user.business_user_detail.business_name}
    </div>
  )),
}));

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

describe("QuotationsGrid", () => {
  const mockQuotations: any[] = [
    {
      id: 1,
      user_id: 1,
      budget: 1000,
      created_at: "2023-10-01T12:00:00Z",
      user: {
        business_user_detail: {
          logo: "logo.png",
          business_name: "Test Business 1",
        },
      },
      discussionable: {
        id: 1,
        status: RFQStatus.ACCEPTED,
        notifiable_users: [
          {
            user_id: "1",
            status: "PENDING",
          },
        ],
      },
    },
    {
      id: 2,
      user_id: 2,
      budget: 2000,
      created_at: "2023-10-02T12:00:00Z",
      user: {
        business_user_detail: {
          logo: "logo2.png",
          business_name: "Test Business 2",
        },
      },
      discussionable: {
        id: 1,
        status: RFQStatus.ACCEPTED,
        notifiable_users: [
          {
            user_id: "2",
            status: "PENDING",
          },
        ],
      },
    },
  ];

  it("renders the QuotationsGrid component with quotations", () => {
    render(<QuotationsGrid quotations={mockQuotations} />);
    const quotationCards = screen.getAllByTestId("quotation-card");
    expect(quotationCards).toHaveLength(2);
    expect(quotationCards[0]).toBeDefined();
    expect(quotationCards[1]).toBeDefined();
  });

  it("displays the accepted quotation message when RFQ status is ACCEPTED", () => {
    const acceptedQuotations = [
      {
        ...mockQuotations[0],
        discussionable: {
          ...mockQuotations[0].discussionable,
          status: RFQStatus.ACCEPTED,
        },
      },
    ];
    render(<QuotationsGrid quotations={acceptedQuotations} />);
    const acceptedMessage = screen.getByTestId("massege");
    expect(acceptedMessage).toBeInTheDocument();
    expect(acceptedMessage).toHaveClass("text-green-700");
  });

  it("does not display the accepted quotation message when RFQ status is not ACCEPTED", () => {
    render(<QuotationsGrid quotations={mockQuotations} />);
    const acceptedMessage = screen.queryByText("massege");
    expect(acceptedMessage).not.toBeInTheDocument();
  });

  it("renders nothing if quotations array is empty", () => {
    render(<QuotationsGrid quotations={[]} />);
    const quotationCards = screen.queryAllByTestId("quotation-card");
    expect(quotationCards).toHaveLength(0);
  });
});
