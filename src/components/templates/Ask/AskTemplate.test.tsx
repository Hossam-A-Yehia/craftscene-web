import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AskTemplate from "./AskTemplate";
import { useFetchUser, useFetchMyAsks, useFetchQuotations } from "@/hooks";
import NoData from "../../../components/molecules/NoDate/NoDate";
import Loader from "../../../components/atoms/Loader/Loader";
import AskDetails from "../../../components/organisms/AskDetails/AskDetails";
import RepliesGrid from "../../../components/organisms/RepliesGrid/RepliesGrid";
import React from "react";
import { expect, vi } from "vitest";
vi.mock("@/hooks/useUser");
vi.mock("@/hooks/useAsks");
vi.mock("@/hooks/useRfqs");
vi.mock("@/components/molecules/NoDate/NoDate");
vi.mock("@/components/atoms/Loader/Loader");
vi.mock("@/components/organisms/AskDetails/AskDetails");
vi.mock("@/components/organisms/RepliesGrid/RepliesGrid");

const mockUseFetchUser = useFetchUser as any;
const mockUseFetchMyAsks = useFetchMyAsks as any;
const mockUseFetchQuotations = useFetchQuotations as any;
const mockNoData = NoData as any;
const mockLoader = Loader as any;
const mockAskDetails = AskDetails as any;
const mockRepliesGrid = RepliesGrid as any;

describe("AskTemplate", () => {
  const askId = "123";
  const mockAsk: any = {
    id: +askId,
    title: "Test Ask",
    content: "This is a test ask",
    // Add other necessary fields
  };

  const mockReplies = [
    { id: "1", content: "Reply 1" },
    { id: "2", content: "Reply 2" },
  ];

  beforeEach(() => {
    mockUseFetchUser.mockReturnValue({ data: { id: "user1" } });
    mockUseFetchMyAsks.mockReturnValue({
      data: { data: [mockAsk] },
      isLoading: false,
    });
    mockUseFetchQuotations.mockReturnValue({ data: mockReplies });
    mockNoData.mockReturnValue(<div>No Data</div>);
    mockLoader.mockReturnValue(<div>Loading...</div>);
    mockAskDetails.mockReturnValue(<div>Ask Details</div>);
    mockRepliesGrid.mockReturnValue(<div>Replies Grid</div>);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state when isLoading is true", () => {
    mockUseFetchMyAsks.mockReturnValue({ data: null, isLoading: true });

    render(<AskTemplate askId={askId} />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("should render NoData component when there is no ask", () => {
    mockUseFetchMyAsks.mockReturnValue({
      data: { data: [] },
      isLoading: false,
    });

    render(<AskTemplate askId={askId} />);
    expect(screen.getByText("No Data")).toBeDefined();
  });

  it("should render AskDetails when activeTab is DETAILS", async () => {
    render(<AskTemplate askId={askId} />);

    await waitFor(() => {
      expect(screen.getByTestId("ask-details")).toBeDefined();
    });
  });

  it("should render RepliesGrid when activeTab is REPLIES", async () => {
    render(<AskTemplate askId={askId} />);

    const repliesButton = screen.getByTestId("replies-tab");
    await userEvent.click(repliesButton);

    await waitFor(() => {
      expect(screen.getByTestId("replies-grid")).toBeDefined();
    });
  });

  it("should switch tabs when clicking on the tab buttons", async () => {
    render(<AskTemplate askId={askId} />);

    const detailsButton = screen.getByTestId("details-tab");
    const repliesButton = screen.getByTestId("replies-tab");

    await userEvent.click(repliesButton);
    await waitFor(() => {
      expect(screen.getByTestId("replies-grid")).toBeDefined();
    });

    await userEvent.click(detailsButton);
    await waitFor(() => {
      expect(screen.getByTestId("ask-details")).toBeDefined();
    });
  });
});
