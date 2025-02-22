import { render, screen, fireEvent } from "@testing-library/react";
import ReceivedAskDetails from "./ReceivedAskDetails";
import { expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: vi.fn(() => "en"),
}));

vi.mock("@/utils/generalUtils", () => ({
  formatDate: vi.fn(() => ({
    formattedDate: "2023-09-15",
    formattedTime: "10:30 AM",
  })),
  findLabelByValue: vi.fn(() => "Mock Label"),
}));
const queryClient = new QueryClient();

describe("ReceivedAskDetails", () => {
  const receivedAskMock = {
    created_at: "2023-09-15T10:30:00Z",
    invitable: {
      title: "Mock Subject",
      content: "Mock Description",
      service: { name_en: "Mock Service" },
      files: [{ id: "1", url: "https://mockfile.com/file.pdf", type: "pdf" }],
      user: { id: "123" },
    },
    invitable_id: "456",
  };

  it("renders the component with correct data", () => {
    render(<ReceivedAskDetails receivedAsk={receivedAskMock} />);

    expect(screen.getByTestId("ask-subject-value")).toHaveTextContent(
      "Mock Subject"
    );
    expect(screen.getByTestId("ask-description-value")).toHaveTextContent(
      "Mock Description"
    );
    expect(screen.getByTestId("ask-service-value")).toHaveTextContent(
      "Mock Service"
    );
    expect(screen.getByTestId("ask-created-at-value")).toHaveTextContent(
      "2023-09-15 10:30 AM"
    );
  });

  it("renders files section if files exist", () => {
    render(<ReceivedAskDetails receivedAsk={receivedAskMock} />);
    expect(screen.getByTestId("ask-file-1")).toBeDefined();
    expect(screen.getByTestId("ask-file-link-1")).toHaveAttribute(
      "href",
      "https://mockfile.com/file.pdf"
    );
  });

  it("renders 'no files available' if no files exist", () => {
    const receivedAskNoFiles = {
      ...receivedAskMock,
      invitable: { ...receivedAskMock.invitable, files: [] },
    };
    render(<ReceivedAskDetails receivedAsk={receivedAskNoFiles} />);
    expect(screen.getByTestId("ask-no-files")).toBeDefined();
  });

  it("toggles reply modal on button click", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ReceivedAskDetails receivedAsk={receivedAskMock} />
      </QueryClientProvider>
    );
    const replyButton = screen.getByTestId("reply-button");
    fireEvent.click(replyButton);
    expect(screen.getByTestId("reply-modal-overlay")).toBeDefined();
  });

  it("renders discussion button with correct link", () => {
    render(<ReceivedAskDetails receivedAsk={receivedAskMock} />);
    const discussionLink = screen.getByTestId("discuss");
    expect(discussionLink).toBeInTheDocument();
  });
});
