import { render, screen, waitFor } from "@testing-library/react";
import { expect, vi } from "vitest";
import WalletPageTemplate from "./WalletPageTemplate";
import { useFetchWallet } from "../../../../hooks/useWallet";
import React from "react";

vi.mock("@/hooks/useWallet", () => ({
  useFetchWallet: vi.fn(),
}));

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

vi.mock("intl", () => ({
  DateTimeFormat: vi.fn().mockImplementation(() => ({
    format: () => "01/01/2024",
  })),
}));

describe("WalletPageTemplate Component", () => {
  const mockUserId = "12345";
  it("renders the WalletPageTemplate with wallet data", async () => {
    const mockWallet = {
      wallet: {
        current_balance: 100,
        total_earned: 200,
      },
      referral_code: "ABC123",
      referredUsers: [
        {
          username: "JohnDoe",
          created_at: "2024-01-01T10:00:00Z",
          date: "2024-01-01",
          points: 100,
        },
        {
          username: "JaneSmith",
          created_at: "2024-01-02T10:00:00Z",
          date: "2024-01-02",
          points: 200,
        },
      ],
    };
    (useFetchWallet as any).mockReturnValue({
      data: mockWallet,
    });
    render(<WalletPageTemplate userId={mockUserId} />);
    await waitFor(() => {
      const walletTitle = screen.getByText("wallet.wallet");
      expect(walletTitle).toBeDefined();
      const balanceAmount = screen.getByText("100 wallet.point");
      expect(balanceAmount).toBeDefined();
      const totalEarned = screen.getByText("wallet.balance (200)");
      expect(totalEarned).toBeDefined();
      const referralCode = screen.getByText("ABC123");
      expect(referralCode).toBeDefined();
      const referredUserJohn = screen.getByTestId("referred-user-card-JohnDoe");
      const referredUserJane = screen.getByTestId(
        "referred-user-card-JaneSmith"
      );
      expect(referredUserJohn).toBeDefined();
      expect(referredUserJane).toBeDefined();
    });
  });
});
