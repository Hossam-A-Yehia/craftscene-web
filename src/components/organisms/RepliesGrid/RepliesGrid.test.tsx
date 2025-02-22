import { render, screen } from "@testing-library/react";
import RepliesGrid from "./RepliesGrid";
import React from "react";
import { expect, vi } from "vitest";

vi.mock("@/components/molecules/ReplyCard/ReplyCard", () => ({
  default: vi.fn(({ reply }) => (
    <div data-testid="reply-card">
      {reply.user.business_user_detail.business_name}
    </div>
  )),
}));

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

describe("repliesGrid", () => {
  const mockReplies: any[] = [
    {
      id: 1,
      user_id: 1,
      budget: 1000,
      created_at: "2023-10-01T12:00:00Z",
      user: {
        business_user_detail: {
          logo: "/logo.png",
          business_name: "Test Business 1",
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
    },
    {
      id: 2,
      user_id: 2,
      budget: 2000,
      created_at: "2023-10-02T12:00:00Z",
      user: {
        business_user_detail: {
          logo: "/logo2.png",
          business_name: "Test Business 2",
        },
      },
      discussionable: {
        id: 1,
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
    render(<RepliesGrid replies={mockReplies} />);
    const replyCards = screen.getAllByTestId("reply-card");
    expect(replyCards).toHaveLength(2);
    expect(replyCards[0]).toBeDefined();
    expect(replyCards[1]).toBeDefined();
  });

  it("renders nothing if replies array is empty", () => {
    render(<RepliesGrid replies={[]} />);
    const replyCards = screen.queryAllByTestId("reply-card");
    expect(replyCards).toHaveLength(0);
  });
});
