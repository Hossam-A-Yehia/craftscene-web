import React from "react";

const StepState = {
  COMPLETED: "completed",
  ACTIVE: "active",
  UPCOMING: "upcoming",
};

const stepClasses = {
  [StepState.ACTIVE]: "bg-main text-white border-transparent",
  [StepState.UPCOMING]: "bg-gray-50 text-gray-900 border-gray-200",
};

const connectorClasses = {
  [StepState.ACTIVE]: "after:bg-main",
  [StepState.UPCOMING]: "after:bg-gray-light",
};

const baseConnectorClass =
  "after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute after:top-5  after:right-1/2   after:-translate-y-1/2";

const getStepState = (step: number, currentStep: number) => {
  if (step <= currentStep) return StepState.ACTIVE;
  return StepState.UPCOMING;
};

const Stepper = ({
  totalSteps,
  currentStep,
}: {
  totalSteps: number;
  currentStep: number;
}) => {
  return (
    <ol
      className="flex items-center w-full text-xs text-gray-900 font-medium sm:text-base max-w-[850px] mx-auto"
      aria-label="Progress Steps"
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        const stepState = getStepState(step, currentStep);
        const isFirstStep = index === 0;

        return (
          <li
            key={step}
            className={`flex justify-center w-full relative ${
              !isFirstStep
                ? `${baseConnectorClass} ${connectorClasses[stepState]}`
                : ""
            }`}
            aria-current={stepState === StepState.ACTIVE ? "step" : undefined}
          >
            <div className="block whitespace-nowrap z-10">
              <span
                className={`w-10 h-10 flex justify-center items-center mx-auto mb-3 text-sm rounded-full  border-2 ${stepClasses[stepState]}`}
                aria-label={`Step ${step} - ${stepState}`}
              >
                {step}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
