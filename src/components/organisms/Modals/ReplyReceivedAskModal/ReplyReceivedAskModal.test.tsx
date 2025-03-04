import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import ReplyReceivedAskModal from "./ReplyReceivedAskModal";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

vi.mock(
  "@/components/molecules/Modals/ReplyReceivedAskModalContent/ReplyReceivedAskModalContent",
  () => {
    return {
      default: ({ onCancel }: { onCancel: () => void }) => (
        <div data-testid="reply-modal-content">
          <button data-testid="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      ),
    };
  }
);

describe("ReplyInvitationModal", () => {
  const renderWithQueryClient = (component) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it("should not render when isOpen is false", () => {
    renderWithQueryClient(
      <ReplyReceivedAskModal
        isOpen={false}
        onCancel={() => {}}
        invitableId={1}
      />
    );
    expect(screen.queryByTestId("reply-modal-overlay")).toBeNull();
  });

  it("should render when isOpen is true", () => {
    renderWithQueryClient(
      <ReplyReceivedAskModal
        isOpen={true}
        onCancel={() => {}}
        invitableId={1}
      />
    );
    expect(screen.getByTestId("reply-modal-overlay")).toBeDefined();
  });

  it("should display ReplyInvitationModalContent when open", () => {
    renderWithQueryClient(
      <ReplyReceivedAskModal
        isOpen={true}
        onCancel={() => {}}
        invitableId={1}
      />
    );
    expect(screen.getByTestId("reply-invitation-modal-content")).toBeDefined();
  });

  it("should call onCancel when cancel button is clicked", () => {
    const onCancelMock = vi.fn();
    renderWithQueryClient(
      <ReplyReceivedAskModal
        isOpen={true}
        onCancel={onCancelMock}
        invitableId={1}
      />
    );
    fireEvent.click(screen.getByTestId("cancel-button-reply"));
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });
});
