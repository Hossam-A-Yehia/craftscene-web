import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Stepper from "./Stepper";
import { expect } from "vitest";

describe("Stepper Component", () => {
  it("renders the correct number of steps", () => {
    const totalSteps = 4;
    render(<Stepper totalSteps={totalSteps} currentStep={1} />);

    const steps = screen.getAllByRole("listitem");
    expect(steps.length).toBe(totalSteps);
  });

  it("applies the correct classes for active and upcoming steps", () => {
    const totalSteps = 4;
    const currentStep = 2;

    render(<Stepper totalSteps={totalSteps} currentStep={currentStep} />);

    const activeSteps = screen.getAllByLabelText(/Step [1-2] - active/i);
    expect(activeSteps.length).toBe(2);

    const upcomingSteps = screen.getAllByLabelText(/Step [3-4] - upcoming/i);
    expect(upcomingSteps.length).toBe(2);
  });

  it("renders the correct aria-current attribute for the current step", () => {
    const totalSteps = 3;
    const currentStep = 2;

    render(<Stepper totalSteps={totalSteps} currentStep={currentStep} />);

    const currentStepElement = screen.getByLabelText("Step 2 - active");
    expect(currentStepElement.closest("li")).toHaveAttribute(
      "aria-current",
      "step"
    );
  });

  it("handles the first step correctly without connectors", () => {
    const totalSteps = 1;
    const currentStep = 1;

    render(<Stepper totalSteps={totalSteps} currentStep={currentStep} />);

    const step = screen.getByLabelText("Step 1 - active");
    expect(step).toBeInTheDocument();

    const connector = document.querySelector("after");
    expect(connector).toBeNull();
  });

  it("renders all steps as UPCOMING when currentStep is 0", () => {
    const totalSteps = 3;
    const currentStep = 0;

    render(<Stepper totalSteps={totalSteps} currentStep={currentStep} />);

    const upcomingSteps = screen.getAllByLabelText(/Step \d - upcoming/i);
    expect(upcomingSteps.length).toBe(totalSteps);
  });
});
