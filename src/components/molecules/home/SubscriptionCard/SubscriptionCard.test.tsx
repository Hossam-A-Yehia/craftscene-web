import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import "@testing-library/jest-dom";
import SubscriptionCard from "./SubscriptionCard";
import React from "react";

describe("SubscriptionCard Component", () => {
  const mockFeatures = [
    { text: "Feature 1", included: true },
    { text: "Feature 2", included: false },
  ];

  it("renders the title correctly", () => {
    render(
      <SubscriptionCard
        title="Premium Plan"
        price={19.99}
        description="Get access to all premium features"
        features={mockFeatures}
        highlighted={false}
      />
    );

    const titleElement = screen.getByText("Premium Plan");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the price correctly", () => {
    render(
      <SubscriptionCard
        title="Premium Plan"
        price={19.99}
        description="Get access to all premium features"
        features={mockFeatures}
        highlighted={false}
      />
    );

    const priceElement = screen.getByText("$19.99");
    expect(priceElement).toBeInTheDocument();
    expect(screen.getByText("Per Month")).toBeInTheDocument();
  });

  it("displays 'Free' for a price of 0", () => {
    render(
      <SubscriptionCard
        title="Free Plan"
        price={0}
        description="Enjoy basic features"
        features={mockFeatures}
        highlighted={false}
      />
    );

    const priceElement = screen.getByText("Free");
    expect(priceElement).toBeInTheDocument();
    expect(screen.getByText("Forever free")).toBeInTheDocument();
  });

  it("renders the correct features with icons", () => {
    render(
      <SubscriptionCard
        title="Premium Plan"
        price={19.99}
        description="Get access to all premium features"
        features={mockFeatures}
        highlighted={false}
      />
    );

    const feature1 = screen.getByText("Feature 1");
    expect(feature1).toBeInTheDocument();
    expect(screen.getByText("Feature 1").previousElementSibling).toHaveClass(
      "text-green-500"
    );

    const feature2 = screen.getByText("Feature 2");
    expect(feature2).toBeInTheDocument();
    expect(screen.getByText("Feature 2").previousElementSibling).toHaveClass(
      "text-red-500"
    );
  });

  it("renders the 'Learn More' button", () => {
    render(
      <SubscriptionCard
        title="Premium Plan"
        price={19.99}
        description="Get access to all premium features"
        features={mockFeatures}
        highlighted={false}
      />
    );

    const buttonElement = screen.getByRole("button", { name: /Learn More/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
