import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, vi } from "vitest";
import InvitationTemplate from "./InvitationTemplate";
import React from "react";
import { useFetchMyInvitations } from "../../../hooks/useRfqs";

vi.mock("@/hooks/useRfqs", () => ({
  useFetchMyInvitations: vi.fn(),
}));

vi.mock("@/components/atoms/Loader/Loader", () => ({
  default: () => <div data-testid="loader" />,
}));
vi.mock("@/components/organisms/InvitationDetails/InvitationDetails", () => ({
  default: ({ invitation }) => (
    <div data-testid="invitation-details">
      {invitation ? "Loaded" : "Not Found"}
    </div>
  ),
}));

const queryClient = new QueryClient();
const mockInvitation = {
  user_id: "1",
  created_at: "2024-01-01T12:00:00Z",
  invitable_id: "123",
  invitable: {
    status: "PENDING",
    subject: "Test Subject",
    description: "Test Description",
    service: { name_en: "Test Service" },
    files: [{ id: "file1", url: "http://example.com/file1", type: "pdf" }],
    user: { id: "2" },
    notifiable_users: [{ user_id: "1", status: "PENDING" }],
  },
};

describe("InvitationTemplate Component", () => {
  it("renders loader when loading", () => {
    (useFetchMyInvitations as any).mockReturnValue({
      isLoading: true,
    });
    render(
      <QueryClientProvider client={queryClient}>
        <InvitationTemplate invitationId="123" />
      </QueryClientProvider>
    );
    expect(screen.getByTestId("loader")).toBeDefined();
  });

  it("renders InvitationDetails when data is available", () => {
    (useFetchMyInvitations as any).mockReturnValue({
      isLoading: false,
      data: { data: [mockInvitation] },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <InvitationTemplate invitationId="123" />
      </QueryClientProvider>
    );
    expect(screen.getByTestId("invitation-details")).toBeDefined();
  });
});
