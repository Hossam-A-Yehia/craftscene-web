import { render, screen, fireEvent } from "@testing-library/react";
import ShareModal from "./ShareModal";
import ShareModalContent from "../../../../components/molecules/Modals/ShareModalContent/ShareModalContent";
import { expect, vi } from "vitest";
import React from "react";

vi.mock(
  "@/components/molecules/Modals/ShareModalContent/ShareModalContent",
  () => ({
    default: vi.fn(() => <div data-testid="share-modal-content" />),
  })
);

describe("ShareModal", () => {
  const onCancelMock = vi.fn();
  const defaultProps = {
    isOpen: true,
    onCancel: onCancelMock,
    img: "test-image.jpg",
    shareTitle: "Test Share Title",
    url: "https://example.com",
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the modal when isOpen is true", () => {
    render(<ShareModal {...defaultProps} />);
    expect(screen.getByTestId("share-modal")).toBeDefined();
  });

  it("does not render when isOpen is false", () => {
    render(<ShareModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByTestId("share-modal")).toBeNull();
  });

  it("calls onCancel when clicking outside the modal", () => {
    render(<ShareModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId("share-modal-overlay"));
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it("passes the correct props to ShareModalContent", () => {
    render(<ShareModal {...defaultProps} />);
    expect(ShareModalContent).toHaveBeenCalled();
  });
});
