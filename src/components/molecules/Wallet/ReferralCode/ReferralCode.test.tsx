import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ReferralCode from "./ReferralCode";
import React from "react";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("react-icons/bi", () => ({
  BiCopy: () => <div data-testid="copy-icon">Copy Icon</div>,
}));

describe("ReferralCode Component", () => {
  const mockCode = "ABC123";

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders basic structure correctly", () => {
    render(<ReferralCode code={mockCode} />);

    expect(screen.getByTestId("referral-code-container")).toBeDefined();
    expect(screen.getByTestId("referral-title")).toHaveTextContent(
      "wallet.referral_code"
    );
    expect(screen.getByTestId("referral-code")).toHaveTextContent(mockCode);
  });

  it("displays copy button when navigator.share is not available", () => {
    Object.defineProperty(navigator, "share", {
      value: undefined,
      configurable: true,
    });

    render(<ReferralCode code={mockCode} />);

    expect(screen.getByTestId("copy-button-container")).toBeDefined();
    expect(screen.getByTestId("copy-button")).toBeDefined();
    expect(screen.getByTestId("copy-icon")).toBeDefined();
  });

  it("displays share button when navigator.share is available", () => {
    Object.defineProperty(navigator, "share", {
      value: vi.fn(),
      configurable: true,
    });
    render(<ReferralCode code={mockCode} />);
    expect(screen.getByTestId("share-button-container")).toBeDefined();
    expect(screen.getByTestId("share-button")).toBeDefined();
  });

  it("handles successful copy to clipboard", async () => {
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    Object.defineProperty(navigator, "clipboard", {
      value: mockClipboard,
      configurable: true,
    });
    Object.defineProperty(navigator, "share", {
      value: undefined,
      configurable: true,
    });
    render(<ReferralCode code={mockCode} />);
    const copyButton = screen.getByTestId("copy-button");
    await fireEvent.click(copyButton);
    expect(mockClipboard.writeText).toHaveBeenCalledWith(
      `Use my referral code "${mockCode}" and earn rewards!`
    );
    expect(screen.queryByTestId("error-message")).toBeNull();
  });

  it("handles successful share", async () => {
    const mockShare = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", {
      value: mockShare,
      configurable: true,
    });
    render(<ReferralCode code={mockCode} />);
    const shareButton = screen.getByTestId("share-button");
    await fireEvent.click(shareButton);
    expect(mockShare).toHaveBeenCalledWith({
      title: "Referral Code",
      text: `Use my referral code "${mockCode}" and earn rewards!`,
    });
    expect(screen.queryByTestId("error-message")).toBeNull();
  });
});
