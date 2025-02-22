import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import ReplyReceivedAskModalContent from "./ReplyReceivedAskModalContent";
import React from "react";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("@/hooks/useRfqs", () => ({
  useMutateAddReply: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("ReplyInvitationModalContent", () => {
  const mockOnCancel = vi.fn();
  const queryClient = new QueryClient();

  beforeEach(() => {
    vi.clearAllMocks();
  });
  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ReplyReceivedAskModalContent onCancel={mockOnCancel} invitableId={1} />
      </QueryClientProvider>
    );
  };

  it("renders form fields and buttons correctly", () => {
    renderComponent();
    expect(screen.getByTestId("reply-invitation-modal-content")).toBeDefined();
    expect(screen.getByTestId("details-reply")).toBeDefined();
    expect(screen.getByTestId("cancel-button-reply")).toBeDefined();
    expect(screen.getByTestId("confirm-button-reply")).toBeDefined();
  });

  it("cancels form submission when cancel button is clicked", async () => {
    renderComponent();
    const cancelButton = screen.getByTestId("cancel-button-reply");
    await userEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("handles file upload", async () => {
    renderComponent();
    const file = new File(["test"], "test.pdf", { type: "application/pdf" });
    const input = screen.getByTestId("file-input");
    await waitFor(() => {
      fireEvent.change(input, { target: { files: [file] } });
    });
    expect(screen.getByText("test.pdf")).toBeDefined();
  });
});
