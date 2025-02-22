import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import VerificationForm from "./VerificationForm";
import { useRouter } from "next/navigation";
import { useResendCode, useVerificationEmail } from "../../../hooks/useAuth";
import React from "react";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/hooks/useAuth", () => ({
  useResendCode: vi.fn(),
  useVerificationEmail: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("@/utils/handleError", () => ({
  handleError: (error: any) => error.message || "Error occurred",
}));

describe("VerificationForm", () => {
  const mockPush = vi.fn();
  const mockMutate = vi.fn();
  const mockMutateAsync = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({
      push: mockPush,
    });
    (useVerificationEmail as any).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    });
    (useResendCode as any).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    const mockUserData = {
      email: "test@example.com",
      phone: "+1234567890",
    };
    Storage.prototype.getItem = vi.fn(() => JSON.stringify(mockUserData));
    Storage.prototype.removeItem = vi.fn();
  });

  test("renders form with initial state", () => {
    render(<VerificationForm />);
    expect(screen.getByTestId("verify")).toBeDefined();
    expect(screen.getByTestId("send-again")).toBeDefined();
  });
  test("handles code verification submission", async () => {
    render(<VerificationForm />);
    const pinInputs = screen.getAllByRole("textbox");
    pinInputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: index.toString() } });
    });
    const verifyButton = screen.getByTestId("verify");
    fireEvent.click(verifyButton);
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { email: "test@example.com", code: "0123" },
        expect.any(Object)
      );
    });
  });

  test("handles successful verification", async () => {
    mockMutate.mockImplementationOnce((data: any, options: any) => {
      options.onSuccess();
    });
    render(<VerificationForm />);
    const pinInputs = screen.getAllByRole("textbox");
    pinInputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: index.toString() } });
    });
    fireEvent.click(screen.getByTestId("verify"));
    await waitFor(() => {
      expect(screen.getByText("auth.varify.success_message")).toBeDefined();
      expect(Storage.prototype.removeItem).toHaveBeenCalled();
    });
  });

  test("disables verify button when code is incomplete", () => {
    render(<VerificationForm />);
    const verifyButton = screen.getByTestId("verify");
    expect(verifyButton).toBeDisabled();
    const pinInputs = screen.getAllByRole("textbox");
    pinInputs.forEach((input, index) => {
      if (index < 3) {
        fireEvent.change(input, { target: { value: index.toString() } });
      }
    });
    expect(verifyButton).toBeDisabled();
  });
});
