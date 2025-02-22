import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import ResetPasswordForm from "./ResetPasswordForm";
import { useResetPassword } from "../../../hooks/useAuth";
import "@testing-library/jest-dom";
import React from "react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("i18next", () => ({
  t: vi.fn((key: string) => key),
}));

vi.mock("../../../hooks/useAuth", () => ({
  useResetPassword: vi.fn(),
}));

describe("ResetPasswordForm Component", () => {
  const mockMutate = vi.fn();
  const mockIsPending = false;
  const mockError = null;

  beforeEach(() => {
    (useResetPassword as any).mockReturnValue({
      mutate: mockMutate,
      isPending: mockIsPending,
      error: mockError,
    });
  });

  it("should toggle password visibility", () => {
    render(<ResetPasswordForm />);

    const passwordInput = screen.getByLabelText("auth.register.password");
    const toggleButton = screen.getByTestId("eye-button");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
