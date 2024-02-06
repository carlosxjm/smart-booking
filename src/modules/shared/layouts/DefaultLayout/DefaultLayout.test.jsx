import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DefaultLayout } from "./DefaultLayout";

vi.mock("../../components/MainHeader/MainHeader", () => ({
  MainHeader: () => <div data-testid="main-header">Mock Main Header</div>,
}));

vi.mock("react-router", () => ({
  Outlet: () => <div data-testid="outlet">Mock Outlet</div>,
}));

vi.mock("../../components/MainFooter/MainFooter", () => ({
  MainFooter: () => <div data-testid="main-footer">Mock Main Footer</div>,
}));

describe("DefaultLayout", () => {
  it("renders main header, outlet, and main footer", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <DefaultLayout />
      </MemoryRouter>
    );

    expect(getByTestId("main-header")).toBeInTheDocument();

    expect(getByTestId("outlet")).toBeInTheDocument();

    expect(getByTestId("main-footer")).toBeInTheDocument();
  });
});
