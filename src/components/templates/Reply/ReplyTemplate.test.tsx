import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import ReplyTemplate from "./ReplyTemplate";
import { useFetchQuotations } from "../../../hooks/useRfqs";
import { useFetchUser } from "../../../hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
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
    notifiable_users: [
      {
        user_id: "1",
      },
    ],
  },
};

describe("QuotationTemplate", () => {
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
    (useQueryClient as any).mockReturnValue(queryClientMock);
  });

  it("renders loader when data is loading", () => {
    (useFetchQuotations as any).mockReturnValue({
      isLoading: true,
    });

    render(<ReplyTemplate replyId="1" />);
    expect(screen.getByTestId("loader")).toBeDefined();
  });

  it("renders quotation details correctly", () => {
    render(<ReplyTemplate replyId="2" />);
    expect(screen.getByTestId("date-time")).toBeDefined();
    expect(screen.getByTestId("rfq-files-label")).toBeDefined();
  });

  it("renders file list correctly when files exist", () => {
    render(<ReplyTemplate replyId="2" />);

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

    render(<ReplyTemplate replyId="2" />);
    expect(screen.getByTestId("rfq-no-files")).toBeDefined();
  });

  it("renders discuss button correctly", () => {
    render(<ReplyTemplate replyId="2" />);
    expect(screen.getByTestId("discuss")).toBeDefined();
  });
});
