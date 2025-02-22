import { render, fireEvent } from "@testing-library/react";
import DeleteModal from "./DeleteModal";
import { expect, vi } from "vitest";
import React from "react";

describe("DeleteModal", () => {
  it("should render the modal when isOpen is true", () => {
    const onCancelMock = vi.fn();
    const onConfirmMock = vi.fn();
    const { getByText } = render(
      <DeleteModal
        isOpen={true}
        onCancel={onCancelMock}
        onConfirm={onConfirmMock}
      />
    );

    expect(getByText("Are you sure you want to delete this?")).toBeDefined();
    expect(getByText("Cancel")).toBeDefined();
    expect(getByText("Confirm")).toBeDefined();
  });

  it("should not render the modal when isOpen is false", () => {
    const onCancelMock = vi.fn();
    const onConfirmMock = vi.fn();
    const { queryByText } = render(
      <DeleteModal
        isOpen={false}
        onCancel={onCancelMock}
        onConfirm={onConfirmMock}
      />
    );
    expect(queryByText("Are you sure you want to delete this?")).toBeNull();
  });

  it("should call onCancel when Cancel button is clicked", () => {
    const onCancelMock = vi.fn();
    const onConfirmMock = vi.fn();

    const { getByText } = render(
      <DeleteModal
        isOpen={true}
        onCancel={onCancelMock}
        onConfirm={onConfirmMock}
      />
    );
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(onCancelMock).toHaveBeenCalledTimes(1);
    expect(onConfirmMock).not.toHaveBeenCalled();
  });

  it("should call both onConfirm and onCancel when Confirm button is clicked", () => {
    const onCancelMock = vi.fn();
    const onConfirmMock = vi.fn();
    const { getByText } = render(
      <DeleteModal
        isOpen={true}
        onCancel={onCancelMock}
        onConfirm={onConfirmMock}
      />
    );
    const confirmButton = getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });
});
