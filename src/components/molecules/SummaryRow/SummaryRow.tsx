import React from "react";

const SummaryRow = ({
  label,
  value,
  valueClass = "text-gray-900",
  testId,
}: {
  label: string;
  value: string;
  valueClass?: string;
  testId?: string;
}) => {
  return (
    <div className="flex items-center justify-between" data-testid={testId}>
      <span
        className="text-sm text-gray-600"
        data-testid={testId ? `${testId}-label` : undefined}
      >
        {label}
      </span>
      <span
        className={`text-sm font-medium ${valueClass}`}
        data-testid={testId ? `${testId}-value` : undefined}
      >
        {value}
      </span>
    </div>
  );
};

export default SummaryRow;
