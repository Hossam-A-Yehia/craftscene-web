import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RFQsTemplate from "./RFQsTemplate";
import { useFetchMyRFQs, useFetchMyInvitations } from "../../../hooks/useRfqs";
import React from "react";

vi.mock("@/hooks/useRfqs", () => ({
  useFetchMyRFQs: vi.fn(),
  useFetchMyInvitations: vi.fn(),
}));

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("@/components/atoms/Loader/Loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("@/components/atoms/Text/Text", () => ({
  default: ({ children, testId }) => <div data-testid={testId}>{children}</div>,
}));

vi.mock("@/components/organisms/RFQsGrid/RFQsGrid", () => ({
  default: ({ filteredRFQs }) => (
    <div data-testid="rfqs-grid">
      {filteredRFQs?.map((rfq: any) => (
        <div key={rfq.id} data-testid={`rfq-${rfq.id}`}>
          {rfq.status}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("@/constants/constants", () => ({
  RFP_STATUS: [
    { value: 0, label: "All" },
    { value: 1, label: "Pending" },
    { value: 2, label: "Completed" },
  ],
}));

describe("RFQsTemplate", () => {
  const mockRFQsPayload = {
    data: {
      payload: {
        data: [
          { id: 1, status: 1, subject: "RFQ 1" },
          { id: 2, status: 2, subject: "RFQ 2" },
          { id: 3, status: 1, subject: "RFQ 3" },
        ],
      },
    },
  };

  const mockInvitationsPayload = {
    data: {
      payload: {
        data: [
          { id: 4, status: 1, subject: "Invitation 1" },
          { id: 5, status: 2, subject: "Invitation 2" },
        ],
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useFetchMyRFQs as any).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
      isError: false,
    });

    vi.mocked(useFetchMyInvitations as any).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
      isError: false,
    });
  });

  it("should render the template container", () => {
    vi.mocked(useFetchMyRFQs as any).mockReturnValue({
      data: mockRFQsPayload.data.payload,
      isLoading: false,
      error: null,
      isError: false,
    });

    render(<RFQsTemplate isInvitation={false} />);
    expect(screen.getByTestId("rfqs-template")).toBeDefined();
  });

  it("should render loader when loading RFQs", () => {
    vi.mocked(useFetchMyRFQs as any).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
    });

    render(<RFQsTemplate isInvitation={false} />);
    expect(screen.getByTestId("loader-container")).toBeDefined();
    expect(screen.queryByTestId("rfqs-container")).toBeNull();
  });

  it("should render RFQs when data is loaded", () => {
    vi.mocked(useFetchMyRFQs as any).mockReturnValue({
      data: mockRFQsPayload.data.payload,
      isLoading: false,
      error: null,
      isError: false,
    });

    render(<RFQsTemplate isInvitation={false} />);
    expect(screen.getByTestId("rfqs-container")).toBeDefined();
  });

  it("should render invitations when isInvitation is true", () => {
    vi.mocked(useFetchMyInvitations as any).mockReturnValue({
      data: mockInvitationsPayload.data.payload,
      isLoading: false,
      error: null,
      isError: false,
    });

    render(<RFQsTemplate isInvitation={true} />);
    expect(screen.getByTestId("title")).toBeDefined();
  });

  it("should filter RFQs when status filter is clicked", () => {
    vi.mocked(useFetchMyRFQs as any).mockReturnValue({
      data: mockRFQsPayload.data.payload,
      isLoading: false,
      error: null,
      isError: false,
    });

    render(<RFQsTemplate isInvitation={false} />);

    fireEvent.click(screen.getByTestId("filter-1"));

    const rfqsContainer = screen.getByTestId("rfqs-grid");
    expect(rfqsContainer).toBeDefined();
  });

  it("should show correct filter state", () => {
    vi.mocked(useFetchMyRFQs as any).mockReturnValue({
      data: mockRFQsPayload.data.payload,
      isLoading: false,
      error: null,
      isError: false,
    });
    render(<RFQsTemplate isInvitation={false} />);
    const allButton = screen.getByTestId("filter-0");
    const pendingButton = screen.getByTestId("filter-1");

    expect(allButton.className).toContain("bg-orange-500");

    fireEvent.click(pendingButton);
    expect(pendingButton.className).toContain("bg-orange-500");
    expect(allButton.className).toContain("bg-gray-200");
  });

  it("should handle empty data correctly", () => {
    vi.mocked(useFetchMyRFQs as any).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      error: null,
      isError: false,
    });
    render(<RFQsTemplate isInvitation={false} />);
    expect(screen.getByTestId("rfqs-container")).toBeDefined();
  });
});
