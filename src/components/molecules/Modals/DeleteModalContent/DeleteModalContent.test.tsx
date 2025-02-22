import { render, fireEvent } from "@testing-library/react";
import DeleteModalContent from "./DeleteModalContent";
import { expect, vi } from "vitest";
import React from "react";

describe("DeleteModalContent", () => {
  it("should call onCancel when Cancel button is clicked", () => {
    const onCancelMock = vi.fn();
    const onConfirmMock = vi.fn();
    const { getByText } = render(
      <DeleteModalContent onConfirm={onConfirmMock} onCancel={onCancelMock} />
    );
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it("should call onConfirm when Confirm button is clicked", () => {
    const onCancelMock = vi.fn();
    const onConfirmMock = vi.fn();
    const { getByText } = render(
      <DeleteModalContent onConfirm={onConfirmMock} onCancel={onCancelMock} />
    );
    const confirmButton = getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it("should display the correct modal content", () => {
    const onCancelMock = vi.fn();
    const onConfirmMock = vi.fn();
    const { getByText } = render(
      <DeleteModalContent onConfirm={onConfirmMock} onCancel={onCancelMock} />
    );
    expect(getByText("Are you sure you want to delete this?")).toBeDefined();
    expect(getByText("Cancel")).toBeDefined();
    expect(getByText("Confirm")).toBeDefined();
  });
});
