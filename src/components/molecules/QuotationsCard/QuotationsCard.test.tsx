import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import QuotationsCard from "./QuotationsCard";
import {
  useMutateAcceptQuotation,
  useMutateDeclineQuotation,
} from "../../../hooks/useRfqs";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { expect, vi } from "vitest";
import React from "react";

vi.mock("@/hooks/useRfqs", () => ({
  useMutateAcceptQuotation: vi.fn(),
  useMutateDeclineQuotation: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: vi.fn(),
}));

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

const mockQuotation: any = {
  id: 1,
  user_id: 1,
  budget: 1000,
  created_at: "2023-10-01T12:00:00Z",
  user: {
    business_user_detail: {
      logo: "/logo.png",
      business_name: "Test Business",
    },
  },
  discussionable: {
    id: 1,
    status: "OPEN",
    notifiable_users: [
      {
        user_id: "1",
        status: "PENDING",
      },
    ],
  },
};

describe("QuotationsCard", () => {
  const mutateAcceptMock = vi.fn();
  const mutateDeclineMock = vi.fn();
  const queryClientMock = {
    invalidateQueries: vi.fn(),
  };

  beforeEach(() => {
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
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("renders the component with correct data", () => {
    render(<QuotationsCard quotation={mockQuotation} />);
    expect(screen.getByTestId("business-name")).toBeDefined();
    expect(screen.getByTestId("budget")).toBeDefined();
    expect(screen.getByTestId("date-time")).toBeDefined();
    expect(screen.getByTestId("view-details")).toBeDefined();
    expect(screen.getByTestId("accept-button")).toBeDefined();
    expect(screen.getByTestId("decline-button")).toBeDefined();
  });

  it("disables buttons when user status is ACCEPTED", () => {
    const modifiedQuotation = {
      ...mockQuotation,
      discussionable: {
        ...mockQuotation.discussionable,
        notifiable_users: [
          {
            user_id: "1",
            status: 3,
          },
        ],
      },
    };
    render(<QuotationsCard quotation={modifiedQuotation} />);
    expect(screen.getByTestId("accept-button")).toBeDisabled();
    expect(screen.getByTestId("decline-button")).toBeDisabled();
  });

  it("calls handleAcceptQuotation when accept button is clicked", async () => {
    render(<QuotationsCard quotation={mockQuotation} />);
    fireEvent.click(screen.getByTestId("accept-button"));
    await waitFor(() => {
      expect(mutateAcceptMock).toHaveBeenCalledWith({
        rfp_id: 1,
        user_id: 1,
      });
      expect(queryClientMock.invalidateQueries).toHaveBeenCalledWith({
        queryKey: ["Quotations"],
      });
      expect(toast.info).toHaveBeenCalledWith("rfq_details.accept_quotation");
    });
  });

  it("calls handleDeclineQuotation when decline button is clicked", async () => {
    render(<QuotationsCard quotation={mockQuotation} />);
    fireEvent.click(screen.getByTestId("decline-button"));
    await waitFor(() => {
      expect(mutateDeclineMock).toHaveBeenCalledWith({
        rfp_id: 1,
        user_id: 1,
      });
      expect(queryClientMock.invalidateQueries).toHaveBeenCalledWith({
        queryKey: ["Quotations"],
      });
      expect(toast.info).toHaveBeenCalledWith("rfq_details.decline_quotation");
    });
  });

  it("shows error toast when handleAcceptQuotation fails", async () => {
    mutateAcceptMock.mockRejectedValueOnce({
      response: {
        data: {
          message: "Error accepting quotation",
        },
      },
    });
    render(<QuotationsCard quotation={mockQuotation} />);
    fireEvent.click(screen.getByTestId("accept-button"));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error accepting quotation");
    });
  });

  it("shows error toast when handleDeclineQuotation fails", async () => {
    mutateDeclineMock.mockRejectedValueOnce({
      response: {
        data: {
          message: "Error declining quotation",
        },
      },
    });
    render(<QuotationsCard quotation={mockQuotation} />);
    fireEvent.click(screen.getByTestId("decline-button"));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error declining quotation");
    });
  });
});
