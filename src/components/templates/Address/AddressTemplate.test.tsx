import { render, screen, waitFor } from "@testing-library/react";
import AddressTemplate from "./AddressTemplate";
import { useFetchAddress } from "@/hooks/useAddress";
import React from "react";
import { expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const mockAddresses = [
  {
    id: 1,
    title: "Home",
    street_address: "123 Main St",
    city: { name_en: "New York" },
    phone: "123-456-7890",
    special_instructions: "Leave at the front door",
  },
  {
    id: 2,
    title: "Work",
    street_address: "456 Office Ave",
    city: { name_en: "San Francisco" },
    phone: "987-654-3210",
    special_instructions: "Ring the bell",
  },
];

vi.mock("../../../hooks/useAddress", () => ({
  useFetchAddress: vi.fn(),
  useMutateDeleteIdea: vi.fn().mockReturnValue({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  }),
}));
vi.mock("i18next", () => ({
  t: (key) => key,
}));
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("AddressTemplate", () => {
  const queryClient = new QueryClient();
  it("renders the address list when addresses are available", async () => {
    (useFetchAddress as any).mockReturnValue({
      data: mockAddresses,
    });
    render(
      <QueryClientProvider client={queryClient}>
        <AddressTemplate userId="123" />
      </QueryClientProvider>
    );
    expect(screen.getByText(/addresses\.addresses/i)).toBeInTheDocument();
    await waitFor(() => {
      mockAddresses.forEach((address) => {
        expect(
          screen.getByText(new RegExp(address.street_address, "i"))
        ).toBeInTheDocument();
        expect(screen.getByText(address.title)).toBeInTheDocument();
        expect(
          screen.getByText(
            new RegExp(address.city?.name_en || "Unknown City", "i")
          )
        ).toBeInTheDocument();
      });
    });
    const deleteButton = screen.getByTestId("add-address");
    expect(deleteButton).toBeInTheDocument();
  });

  it("renders a message when there are no addresses", async () => {
    (useFetchAddress as any).mockReturnValue({
      data: [],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <AddressTemplate userId="123" />
      </QueryClientProvider>
    );
    expect(screen.getByText("No Data Available")).toBeInTheDocument();
  });
});
