import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ShareModalContent from "./ShareModalContent";
import { expect, vi } from "vitest";
import React from "react";

const mockOnCancel = vi.fn();
const mockUrl = "/test-url";
const mockImg = "https://example.com/image.jpg";
const mockShareTitle = "Test Project";

describe("ShareModalContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <ShareModalContent
        onCancel={mockOnCancel}
        img={mockImg}
        shareTitle={mockShareTitle}
        url={mockUrl}
      />
    );

    expect(screen.getByTestId("share-modal-container")).toBeDefined();
    expect(screen.getByTestId("close-button")).toBeDefined();
    expect(screen.getByTestId("share-image")).toHaveAttribute("src", mockImg);
    expect(screen.getByTestId("copy-button")).toBeDefined();
  });

  it("closes modal when close button is clicked", () => {
    render(
      <ShareModalContent
        onCancel={mockOnCancel}
        img={mockImg}
        shareTitle={mockShareTitle}
        url={mockUrl}
      />
    );

    fireEvent.click(screen.getByTestId("close-button"));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("copies URL to clipboard and shows confirmation message", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(),
      },
    });

    render(
      <ShareModalContent
        onCancel={mockOnCancel}
        img={mockImg}
        shareTitle={mockShareTitle}
        url={mockUrl}
      />
    );

    const copyButton = screen.getByTestId("copy-button");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByTestId("copied-message")).toBeDefined();
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `https://craftscene-website.vercel.app${mockUrl}`
    );
  });

  it("renders social share buttons", () => {
    render(
      <ShareModalContent
        onCancel={mockOnCancel}
        img={mockImg}
        shareTitle={mockShareTitle}
        url={mockUrl}
      />
    );

    expect(screen.getByTestId("facebook-share")).toBeDefined();
    expect(screen.getByTestId("twitter-share")).toBeDefined();
    expect(screen.getByTestId("telegram-share")).toBeDefined();
    expect(screen.getByTestId("whatsapp-share")).toBeDefined();
    expect(screen.getByTestId("linkedin-share")).toBeDefined();
    expect(screen.getByTestId("email-share")).toBeDefined();
    expect(screen.getByTestId("threads-share")).toBeDefined();
  });
});
