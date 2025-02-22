import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import VerifyModalContent from "./VerifyModalContent";
import { toast } from "react-toastify";
import { useChangePhoneOrEmail } from "../../../../hooks/useAuth";
import React from "react";

vi.mock("react-toastify", () => ({
  toast: {
    warn: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/hooks/useAuth", () => ({
  useChangePhoneOrEmail: vi.fn(),
}));

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

describe("VerifyModalContent", () => {
  const mockProps = {
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
    onUpdate: vi.fn(),
    isResendPending: false,
  };

  const mockMutateAsync = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useChangePhoneOrEmail as any).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });
  });

  describe("Email Verification Mode", () => {
    beforeEach(() => {
      render(<VerifyModalContent {...mockProps} target="test@example.com" />);
    });

    test("renders initial email verification view", () => {
      expect(screen.getByTestId("verify-modal")).toBeDefined();
      expect(screen.getByTestId("target-value")).toHaveTextContent(
        "test@example.com"
      );
    });

    test("handles resend verification code", () => {
      const resendButton = screen.getByTestId("resend-button");
      fireEvent.click(resendButton);
      expect(mockProps.onConfirm).toHaveBeenCalled();
    });

    test("switches to edit mode", () => {
      const changeButton = screen.getByTestId("change-button");
      fireEvent.click(changeButton);
      expect(screen.getByTestId("email-input")).toBeDefined();
    });
  });

  describe("Phone Verification Mode", () => {
    beforeEach(() => {
      render(<VerifyModalContent {...mockProps} target="+11234567890" />);
    });

    test("renders initial phone verification view", () => {
      expect(screen.getByTestId("verify-modal")).toBeDefined();
      expect(screen.getByTestId("target-value")).toHaveTextContent(
        "+11234567890"
      );
    });

    test("switches to phone edit mode", () => {
      const changeButton = screen.getByTestId("change-button");
      fireEvent.click(changeButton);
      expect(screen.getByTestId("phone-input")).toBeDefined();
    });
  });

  describe("Edit Mode Functionality", () => {
    test("handles successful email update", async () => {
      const newEmail = "new@example.com";
      mockMutateAsync.mockResolvedValueOnce({});

      render(<VerifyModalContent {...mockProps} target="old@example.com" />);
      fireEvent.click(screen.getByTestId("change-button"));

      const input = screen.getByTestId("email-input");
      fireEvent.change(input, { target: { value: newEmail } });
      fireEvent.click(screen.getByTestId("save-button"));

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          old_email: "old@example.com",
          new_email: newEmail,
        });
        expect(toast.success).toHaveBeenCalled();
        expect(mockProps.onUpdate).toHaveBeenCalledWith(newEmail);
      });
    });

    test("handles failed update", async () => {
      const errorMessage = "Update failed";
      mockMutateAsync.mockRejectedValueOnce(new Error(errorMessage));
      render(<VerifyModalContent {...mockProps} target="old@example.com" />);
      fireEvent.click(screen.getByTestId("change-button"));
      fireEvent.change(screen.getByTestId("email-input"), {
        target: { value: "new@example.com" },
      });
      fireEvent.click(screen.getByTestId("save-button"));

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(errorMessage);
      });
    });

    test("validates empty input", async () => {
      render(<VerifyModalContent {...mockProps} target="old@example.com" />);

      fireEvent.click(screen.getByTestId("change-button"));
      fireEvent.change(screen.getByTestId("email-input"), {
        target: { value: "" },
      });
      fireEvent.click(screen.getByTestId("save-button"));

      expect(toast.warn).toHaveBeenCalled();
      expect(mockMutateAsync).not.toHaveBeenCalled();
    });

    test("handles cancel edit", () => {
      render(<VerifyModalContent {...mockProps} target="test@example.com" />);

      fireEvent.click(screen.getByTestId("change-button"));
      fireEvent.click(screen.getByTestId("cancel-button"));

      expect(screen.queryByTestId("email-input")).toBeNull();
    });
  });

  test("handles modal close", () => {
    render(<VerifyModalContent {...mockProps} target="test@example.com" />);

    fireEvent.click(screen.getByTestId("close-button"));
    expect(mockProps.onCancel).toHaveBeenCalled();
  });
});
