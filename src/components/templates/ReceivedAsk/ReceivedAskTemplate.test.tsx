import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ReceivedAskTemplate from "./ReceivedAskTemplate";
import { useFetchReceivedAsks } from "../../../hooks/useAsks";
import React from "react";

vi.mock("@/hooks/useAsks", () => ({
  useFetchReceivedAsks: vi.fn(),
}));

vi.mock("@/components/atoms/Loader/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("@/components/organisms/ReceivedAskDetails/ReceivedAskDetails", () => ({
  __esModule: true,
  default: ({ receivedAsk }: { receivedAsk: any }) => (
    <div data-testid="received-ask-details">
      {receivedAsk ? `Ask ID: ${receivedAsk.id}` : "No Ask Data"}
    </div>
  ),
}));

describe("ReceivedAskTemplate", () => {
  it("renders the loader when loading", () => {
    (useFetchReceivedAsks as any).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<ReceivedAskTemplate receivedAskId="123" />);
    expect(screen.getByTestId("loader")).toBeDefined();
  });

  it("renders ReceivedAskDetails with fetched data", () => {
    const mockReceivedAsk = {
      id: "123",
      title: "Mock Ask Title",
    };

    (useFetchReceivedAsks as any).mockReturnValue({
      data: { data: [mockReceivedAsk] },
      isLoading: false,
    });

    render(<ReceivedAskTemplate receivedAskId="123" />);

    expect(screen.getByTestId("received-ask-details")).toHaveTextContent(
      "Ask ID: 123"
    );
  });
});
