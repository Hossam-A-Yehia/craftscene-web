import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditUserForm from "./EditUserForm";
import { useFetchUser, useMutateEditUser } from "../../../hooks/useUser";
import { useFetchCountries } from "../../../hooks/useCountries";
import { expect, vi } from "vitest";
import React from "react";
import { UserProvider } from "../../../context/UserContext";

vi.mock("@/hooks/useUser");
vi.mock("@/hooks/useCountries");
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
  }),
}));
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const queryClient = new QueryClient();

describe("EditUserForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form and submits with valid data", async () => {
    (useFetchUser as any).mockReturnValue({
      data: {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        country_id: "1",
        city_id: "10",
      },
      isLoading: false,
      isError: false,
    });
    (useFetchCountries as any).mockReturnValue({
      countryOptions: [{ value: "1", label: "Country 1" }],
      cityOptions: () => [{ value: "10", label: "City 10" }],
      isCountriesLoading: false,
    });
    (useMutateEditUser as any).mockReturnValue({
      mutateAsync: vi.fn().mockResolvedValue({}),
      isPending: false,
      error: null,
      isSuccess: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <EditUserForm userId="1" />
        </UserProvider>
      </QueryClientProvider>
    );

    expect(screen.getByTestId("edit-first_name")).toBeDefined();
    expect(screen.getByTestId("edit-last_name")).toBeDefined();
    expect(screen.getByTestId("edit-email")).toBeDefined();
    expect(screen.getByTestId("edit-phone")).toBeDefined();
    expect(screen.getByTestId("edit-city")).toBeDefined();
    expect(screen.getByTestId("edit-country")).toBeDefined();

    fireEvent.click(screen.getByTestId("edit user"));
  });
});
