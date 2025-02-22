import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import VerifyModal from "./VerifyModal";
import React from "react";

vi.mock(
  "@/components/molecules/Modals/VerifyModalContent/VerifyModalContent",
  () => ({
    default: ({ onConfirm, onCancel, target, onUpdate }: any) => (
      <div data-testid="modal-content">
        <span data-testid="target-value">{target}</span>
        <button data-testid="confirm-button" onClick={onConfirm}>
          Confirm
        </button>
        <button data-testid="cancel-button" onClick={onCancel}>
          Cancel
        </button>
        <button
          data-testid="update-button"
          onClick={() => onUpdate("new-value")}
        >
          Update
        </button>
      </div>
    ),
  })
);

describe("VerifyModal", () => {
  const mockProps = {
    isOpen: true,
    onCancel: vi.fn(),
    onConfirm: vi.fn(),
    target: "test@example.com",
    onUpdate: vi.fn(),
    isResendPending: false,
  };

  test("renders when isOpen is true", () => {
    render(<VerifyModal {...mockProps} />);

    expect(screen.getByTestId("modal-content")).toBeDefined();
    expect(screen.getByTestId("target-value")).toHaveTextContent(
      "test@example.com"
    );
  });

  test("does not render when isOpen is false", () => {
    render(<VerifyModal {...mockProps} isOpen={false} />);

    expect(screen.queryByTestId("animated-content")).toBeNull();
    expect(screen.queryByTestId("modal-content")).toBeNull();
  });

  test("handles confirm action", () => {
    render(<VerifyModal {...mockProps} />);

    fireEvent.click(screen.getByTestId("confirm-button"));

    expect(mockProps.onConfirm).toHaveBeenCalled();
    expect(mockProps.onCancel).toHaveBeenCalled();
  });

  test("handles update action", () => {
    render(<VerifyModal {...mockProps} />);

    fireEvent.click(screen.getByTestId("update-button"));

    expect(mockProps.onUpdate).toHaveBeenCalledWith("new-value");
  });

  test("handles undefined target", () => {
    render(<VerifyModal {...mockProps} target={undefined} />);

    expect(screen.getByTestId("target-value")).toHaveTextContent("");
  });

  test("passes isResendPending to VerifyModalContent", () => {
    const { rerender } = render(
      <VerifyModal {...mockProps} isResendPending={true} />
    );

    expect(screen.getByTestId("modal-content")).toBeDefined();

    rerender(<VerifyModal {...mockProps} isResendPending={false} />);

    expect(screen.getByTestId("modal-content")).toBeDefined();
  });
});
