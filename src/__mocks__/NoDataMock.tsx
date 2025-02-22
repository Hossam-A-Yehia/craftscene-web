import React from "react";
import { vi } from "vitest";

vi.mock("@/components/molecules/NoDate/NoData", () => ({
  default: () => <div data-testid="no-data-component">No Data</div>,
}));
