import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ClientInfo from "./ClientInfo";
import React from "react";

vi.mock("@/components/atoms/Text/Text", () => ({
  default: vi.fn(({ testId, className, children }) => (
    <div data-testid={testId} className={className}>
      {children}
    </div>
  )),
}));

vi.mock("@/components/molecules/SummaryRow/SummaryRow", () => ({
  default: vi.fn(({ testId, label, value }) => (
    <div data-testid={testId}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )),
}));

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

describe("ClientInfo", () => {
  const clientInfoProps = {
    clinetName: "John Doe",
    email: "john.doe@example.com",
    orderId: 123,
    phone: "+1234567890",
    deliveryAddress: {
      street_address: "123 Main St",
      city: {
        name_en: "New York",
      },
      country: {
        name_en: "USA",
      },
    },
  };

  const renderComponent = (props = clientInfoProps) =>
    render(<ClientInfo {...props} />);

  it("renders the component correctly", () => {
    renderComponent();

    expect(screen.getByTestId("payment-summary")).toBeDefined();
    expect(screen.getByTestId("order-summary-title")).toBeDefined();
  });

  it("displays the client name correctly", () => {
    renderComponent();
    expect(screen.getByTestId("client-name")).toBeDefined();
  });

  it("displays the order ID correctly", () => {
    renderComponent();
    expect(screen.getByTestId("order-id")).toBeDefined();
  });

  it("displays the delivery address correctly", () => {
    renderComponent();
    expect(screen.getByTestId("order-address")).toBeDefined();
  });

  it("displays the email correctly", () => {
    renderComponent();
    expect(screen.getByTestId("order-email")).toBeDefined();
  });

  it("displays the phone number correctly", () => {
    renderComponent();
    expect(screen.getByTestId("order-phone")).toBeDefined();
  });

  it("handles missing email", () => {
    const propsWithoutEmail = { ...clientInfoProps, email: undefined };
    renderComponent(propsWithoutEmail as any);

    expect(screen.getByText("__")).toBeDefined();
  });

  it("handles missing street address by showing city and country", () => {
    const propsWithoutStreetAddress = {
      ...clientInfoProps,
      deliveryAddress: {
        ...clientInfoProps.deliveryAddress,
        street_address: undefined,
      },
    };
    renderComponent(propsWithoutStreetAddress as any);

    expect(screen.getByText("USA, New York")).toBeDefined();
  });
});
