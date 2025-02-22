import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { expect, vi } from "vitest";
import ForgetPasswordForm from "./ForgetPasswordForm";
import { useForgetPassword } from "../../../hooks/useAuth";
import { t } from "i18next";

vi.mock("@/hooks/useAuth", () => ({
  useForgetPassword: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

describe("ForgetPasswordForm Component", () => {
  let mutateMock;

  beforeEach(() => {
    mutateMock = vi.fn();
    (useForgetPassword as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      error: null,
    });
  });

  it("renders form elements correctly", () => {
    render(<ForgetPasswordForm />);
    expect(
      screen.getByText(t("auth.forget_password.title"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("auth.forget_password.desc"))
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        t("auth.forget_password.placeholder_email_or_phone")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("auth.forget_password.button"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("auth.forget_password.back_login"))
    ).toBeInTheDocument();
  });

  it("displays success message on successful mutation", async () => {
    mutateMock.mockImplementation((_, { onSuccess }) => onSuccess());

    render(<ForgetPasswordForm />);
    const input = screen.getByPlaceholderText(
      t("auth.forget_password.placeholder_email_or_phone")
    );
    const button = screen.getByText(t("auth.forget_password.button"));

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(
        screen.getByText(t("auth.forget_password.success_message"))
      ).toBeInTheDocument()
    );
  });

  it("calls mutation with correct parameters for email", async () => {
    render(<ForgetPasswordForm />);
    const input = screen.getByPlaceholderText(
      t("auth.forget_password.placeholder_email_or_phone")
    );
    const button = screen.getByText(t("auth.forget_password.button"));

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(mutateMock).toHaveBeenCalledWith(
        { target_key: "email", target_value: "test@example.com" },
        expect.any(Object)
      )
    );
  });

  it("calls mutation with correct parameters for phone", async () => {
    render(<ForgetPasswordForm />);
    const input = screen.getByPlaceholderText(
      t("auth.forget_password.placeholder_email_or_phone")
    );
    const button = screen.getByText(t("auth.forget_password.button"));

    fireEvent.change(input, { target: { value: "+1234567890123" } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(mutateMock).toHaveBeenCalledWith(
        { target_key: "phone", target_value: "+1234567890123" },
        expect.any(Object)
      )
    );
  });

  it("displays error message on mutation failure", async () => {
    const errorMessage = "An error occurred";
    (useForgetPassword as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      error: { message: errorMessage },
    });

    render(<ForgetPasswordForm />);
    const input = screen.getByPlaceholderText(
      t("auth.forget_password.placeholder_email_or_phone")
    );
    const button = screen.getByText(t("auth.forget_password.button"));

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    );
  });

  it("disables the submit button while mutation is pending", () => {
    (useForgetPassword as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      mutate: mutateMock,
      isPending: true,
      error: null,
    });
    render(<ForgetPasswordForm />);
    const button = screen.getByTestId("submit-button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("btn-loading");
  });
});
