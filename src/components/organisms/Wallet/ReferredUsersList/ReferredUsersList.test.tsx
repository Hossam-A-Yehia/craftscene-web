import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import ReferredUsersList from "./ReferredUsersList";
import React from "react";

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));
vi.mock("@/components/molecules/ReferredUserCard/ReferredUserCard", () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="referred-user-card" />),
}));
vi.mock("@/utils/generalUtils", () => ({
  formatDate: vi.fn(() => ({
    formattedDate: "Mocked Date",
    formattedTime: "Mocked Time",
  })),
}));

describe("ReferredUsersList Component", () => {
  it("renders the ReferredUsersList component with a list of users", () => {
    const mockUsers = [
      {
        created_at: "2024-01-01T10:00:00Z",
        username: "JohnDoe",
        date: "2024-01-01",
        points: 100,
      },
      {
        created_at: "2024-01-02T10:00:00Z",
        username: "JaneSmith",
        date: "2024-01-02",
        points: 200,
      },
    ];
    render(<ReferredUsersList users={mockUsers} />);
    const titleElement = screen.getByText("wallet.referred_users");
    expect(titleElement).toBeDefined();
    const userCardJohn = screen.getByTestId("referred-user-card-JohnDoe");
    const userCardJane = screen.getByTestId("referred-user-card-JaneSmith");
    expect(userCardJohn).toBeDefined();
    expect(userCardJane).toBeDefined();
  });
});
