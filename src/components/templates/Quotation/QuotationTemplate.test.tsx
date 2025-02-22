import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import QuotationTemplate from "./QuotationTemplate";
import {
  useFetchQuotations,
  useMutateAcceptQuotation,
  useMutateDeclineQuotation,
} from "../../../hooks/useRfqs";
import { useFetchUser } from "../../../hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { UserStatus, RFQStatus } from "../../../constants/enums/rfqsEnum";
import React from "react";

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: vi.fn(),
  useMutation: vi.fn().mockImplementation(({ mutationFn }) => ({
    mutateAsync: mutationFn,
    isPending: false,
  })),
  useQuery: vi.fn(),
}));

vi.mock("@/hooks/useRfqs", async () => {
  const actual = await vi.importActual("@/hooks/useRfqs");
  return {
    ...actual,
    useMutateAcceptQuotation: vi.fn(),
    useMutateDeclineQuotation: vi.fn(),
    useFetchQuotations: vi.fn(),
  };
});
vi.mock("@/hooks/useUser");
vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));
vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));
vi.mock("next/link", () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}));

const mockQuotation = {
  id: "1",
  user_id: "1",
  details: "Test quotation details",
  budget: 1000,
  created_at: "2024-02-01T12:00:00Z",
  files: [
    { id: 1, type: 1, url: "https://example.com/file1" },
    { id: 2, type: 2, url: "https://example.com/file2" },
  ],
  user: {
    id: 1,
    username: "TestUser",
    business_user_detail: {
      logo: "/test-logo.png",
    },
  },
  discussionable: {
    id: 1,
    status: RFQStatus.ACCEPTED,
    notifiable_users: [
      {
        user_id: "1",
        status: UserStatus.ACCEPTED,
      },
    ],
  },
};

describe("QuotationTemplate", () => {
  const mutateAcceptMock = vi.fn();
  const mutateDeclineMock = vi.fn();
  const queryClientMock = {
    invalidateQueries: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    (useFetchUser as any).mockReturnValue({
      data: { id: "1" },
    });

    (useFetchQuotations as any).mockReturnValue({
      data: [mockQuotation],
      isLoading: false,
    });
    (useMutateAcceptQuotation as any).mockReturnValue({
      mutateAsync: mutateAcceptMock,
      isPending: false,
    });

    (useMutateDeclineQuotation as any).mockReturnValue({
      mutateAsync: mutateDeclineMock,
      isPending: false,
    });

    (useQueryClient as any).mockReturnValue(queryClientMock);
  });

  it("renders loader when data is loading", () => {
    (useFetchQuotations as any).mockReturnValue({
      isLoading: true,
    });

    render(<QuotationTemplate quotationId="1" />);
    expect(screen.getByTestId("loader")).toBeDefined();
  });

  it("renders quotation details correctly", () => {
    render(<QuotationTemplate quotationId="2" />);
    expect(screen.getByTestId("date-time")).toBeDefined();
    expect(screen.getByTestId("rfq-status-label")).toBeDefined();
    expect(screen.getByTestId("rfq-files-label")).toBeDefined();
  });

  it("renders file list correctly when files exist", () => {
    render(<QuotationTemplate quotationId="2" />);

    expect(screen.getByTestId("rfq-file-1")).toBeDefined();
    expect(screen.getByTestId("rfq-file-2")).toBeDefined();
    expect(screen.getByTestId("rfq-file-link-1")).toHaveAttribute(
      "href",
      "https://example.com/file1"
    );
    expect(screen.getByTestId("rfq-file-link-2")).toHaveAttribute(
      "href",
      "https://example.com/file2"
    );
  });

  it("renders no files message when no files exist", () => {
    const quotationWithNoFiles = {
      ...mockQuotation,
      files: [],
    };
    (useFetchQuotations as any).mockReturnValue({
      data: [quotationWithNoFiles],
      isLoading: false,
    });

    render(<QuotationTemplate quotationId="2" />);
    expect(screen.getByTestId("rfq-no-files")).toBeDefined();
  });

  it("disables buttons when user status is ACCEPTED", () => {
    const acceptedQuotation = {
      ...mockQuotation,
      discussionable: {
        ...mockQuotation.discussionable,
        notifiable_users: [
          {
            user_id: "1",
            status: UserStatus.ACCEPTED,
          },
        ],
      },
    };

    (useFetchQuotations as any).mockReturnValue({
      data: [acceptedQuotation],
      isLoading: false,
    });

    render(<QuotationTemplate quotationId="2" />);

    expect(screen.getByTestId("accept-button")).toBeDisabled();
    expect(screen.getByTestId("decline-button")).toBeDisabled();
  });

  it("disables buttons when RFQ status is CLOSED", () => {
    const closedQuotation = {
      ...mockQuotation,
      discussionable: {
        ...mockQuotation.discussionable,
        status: RFQStatus.CLOSED,
      },
    };

    (useFetchQuotations as any).mockReturnValue({
      data: [closedQuotation],
      isLoading: false,
    });

    render(<QuotationTemplate quotationId="2" />);

    expect(screen.getByTestId("accept-button")).toBeDisabled();
    expect(screen.getByTestId("decline-button")).toBeDisabled();
  });

  it("renders discuss button correctly", () => {
    render(<QuotationTemplate quotationId="2" />);
    expect(screen.getByTestId("discuss")).toBeDefined();
  });
});
