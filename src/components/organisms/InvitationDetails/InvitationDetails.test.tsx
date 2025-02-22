import { render, screen } from "@testing-library/react";
import InvitationDetails from "./InvitationDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, vi } from "vitest";
import React from "react";

vi.mock("react-toastify", () => ({ toast: { info: vi.fn(), error: vi.fn() } }));
vi.mock("@/hooks/useRfqs", () => ({
  useMutateDeclineQuotation: () => ({ mutateAsync: vi.fn() }),
  useMutateAddReply: () => ({ mutateAsync: vi.fn() }),
}));

const queryClient = new QueryClient();
const mockInvitation = {
  user_id: "1",
  created_at: "2024-01-01T12:00:00Z",
  invitable_id: "123",
  invitable: {
    status: 1,
    subject: "Test Subject",
    description: "Test Description",
    service: { name_en: "Test Service" },
    files: [{ id: "file1", url: "http://example.com/file1", type: "pdf" }],
    user: { id: "2" },
    notifiable_users: [{ user_id: "1", status: 1 }],
  },
};

const renderComponent = (invitation = mockInvitation) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <InvitationDetails invitation={invitation} />
    </QueryClientProvider>
  );
};

test("renders RFQ details correctly", () => {
  renderComponent();
  expect(screen.getByTestId("rfq-status-label")).toBeDefined();
  expect(screen.getByTestId("rfq-subject-label")).toBeDefined();
  expect(screen.getByTestId("rfq-subject-value")).toBeDefined();
  expect(screen.getByTestId("rfq-description-label")).toBeDefined();
  expect(screen.getByTestId("rfq-description-value")).toBeDefined();
  expect(screen.getByTestId("rfq-service-label")).toBeDefined();
  expect(screen.getByTestId("rfq-service-value")).toBeDefined();
  expect(screen.getByTestId("rfq-files-label")).toBeDefined();
  expect(screen.getByTestId("rfq-file-link-file1")).toHaveAttribute(
    "href",
    "http://example.com/file1"
  );
});

test("disables buttons when user status is invalid", () => {
  const invitation = {
    ...mockInvitation,
    invitable: { ...mockInvitation.invitable, status: 3 },
  };
  renderComponent(invitation);
  expect(screen.getByTestId("reply-button")).toBeDisabled();
  expect(screen.getByTestId("decline-button")).toBeDisabled();
});

test("enables buttons when user status is valid", () => {
  renderComponent();
  expect(screen.getByTestId("reply-button")).not.toBeDisabled();
  expect(screen.getByTestId("decline-button")).not.toBeDisabled();
});
