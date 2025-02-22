import { render, screen } from "@testing-library/react";
import ReplyCard from "./ReplyCard ";
import { expect, vi } from "vitest";
import React from "react";

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

const mockReply: any = {
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
    notifiable_users: [
      {
        user_id: "1",
        status: "PENDING",
      },
    ],
  },
};

describe("QuotationsCard", () => {
  it("renders the component with correct data", () => {
    render(<ReplyCard reply={mockReply} />);
    expect(screen.getByTestId("date-time")).toBeDefined();
    expect(screen.getByTestId("view-details")).toBeDefined();
  });
});
