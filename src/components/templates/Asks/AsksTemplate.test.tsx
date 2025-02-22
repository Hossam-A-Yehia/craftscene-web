import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AsksTemplate from "./AsksTemplate";
import { useFetchMyAsks, useFetchReceivedAsks } from "../../../hooks/useAsks";
import React from "react";

vi.mock("@/hooks/useAsks", () => ({
  useFetchMyAsks: vi.fn(),
  useFetchReceivedAsks: vi.fn(),
}));

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("@/components/atoms/Loader/Loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("@/components/atoms/Text/Text", () => ({
  default: ({ children, testId }) => <div data-testid={testId}>{children}</div>,
}));

vi.mock("@/components/organisms/AsksGrid/AsksGrid", () => ({
  default: () => <div data-testid="asks-grid"></div>,
}));

vi.mock("@/constants/constants", () => ({
  RFP_STATUS: [
    { value: 0, label: "All" },
    { value: 1, label: "Pending" },
    { value: 2, label: "Completed" },
  ],
}));

describe("AsksTemplate", () => {
  const mockAsksPayload = {
    data: {
      payload: {
        data: [
          { id: 1, status: 1, title: "ask 1" },
          { id: 2, status: 2, title: "ask 2" },
          { id: 3, status: 1, title: "ask 3" },
        ],
      },
    },
  };

  const mockInvitationsPayload = {
    data: {
      payload: {
        data: [
          { id: 4, title: "Invitation 1" },
          { id: 5, title: "Invitation 2" },
        ],
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useFetchMyAsks as any).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
      isError: false,
    });

    vi.mocked(useFetchReceivedAsks as any).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
      isError: false,
    });
  });

  it("should render the template container", () => {
    vi.mocked(useFetchMyAsks as any).mockReturnValue({
      data: mockAsksPayload.data.payload,
      isLoading: false,
      error: null,
      isError: false,
    });

    render(<AsksTemplate isInvitation={false} />);
    expect(screen.getByTestId("asks-template")).toBeDefined();
  });

  it("should render loader when loading Asks", () => {
    vi.mocked(useFetchMyAsks as any).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
    });

    render(<AsksTemplate isInvitation={false} />);
    expect(screen.getByTestId("loader-container")).toBeDefined();
    expect(screen.queryByTestId("asks-container")).toBeNull();
  });

  it("should render asks when data is loaded", () => {
    vi.mocked(useFetchMyAsks as any).mockReturnValue({
      data: mockAsksPayload.data.payload,
      isLoading: false,
      error: null,
      isError: false,
    });

    render(<AsksTemplate isInvitation={false} />);
    expect(screen.getByTestId("asks-container")).toBeDefined();
  });

  it("should render invitations when isInvitation is true", () => {
    vi.mocked(useFetchReceivedAsks as any).mockReturnValue({
      data: mockInvitationsPayload.data.payload,
      isLoading: false,
      error: null,
      isError: false,
    });

    render(<AsksTemplate isInvitation={true} />);
    expect(screen.getByTestId("title")).toBeDefined();
  });

  it("should handle empty data correctly", () => {
    vi.mocked(useFetchMyAsks as any).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      error: null,
      isError: false,
    });
    render(<AsksTemplate isInvitation={false} />);
    expect(screen.getByTestId("asks-container")).toBeDefined();
  });
});
