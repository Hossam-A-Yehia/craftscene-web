import React from "react";
import { vi } from "vitest";

vi.mock("@/components/molecules/RFQsCard/RFQsCard", () => ({
  default: ({ id, status, subject, service, category }) => (
    <div data-testid={`rfq-card-${id}`}>
      <span data-testid={`rfq-status-${id}`}>{status}</span>
      <span data-testid={`rfq-subject-${id}`}>{subject}</span>
      <span data-testid={`rfq-service-${id}`}>{service}</span>
      <span data-testid={`rfq-category-${id}`}>{category}</span>
    </div>
  ),
}));
