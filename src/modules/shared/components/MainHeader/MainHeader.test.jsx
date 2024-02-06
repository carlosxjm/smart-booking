import { describe, expect, it } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MainHeader } from "./MainHeader";

describe("MainHeader", () => {
  it("toggles menu when button is clicked", () => {
    render(
      <MemoryRouter>
        <MainHeader />
      </MemoryRouter>
    );

    const toggleMenuButton = screen.getByLabelText("Show menu");
    fireEvent.click(toggleMenuButton);
    expect(toggleMenuButton).toHaveAttribute("aria-label", "Hide menu");

    const allBookingsLink = screen.getByText("All bookings");
    expect(allBookingsLink).toBeInTheDocument();

    const newBookingLink = screen.getByText("New booking");
    expect(newBookingLink).toBeInTheDocument();

    fireEvent.click(toggleMenuButton);
    expect(toggleMenuButton).toHaveAttribute("aria-label", "Show menu");
  });

  it("closes menu when clicking outside", () => {
    render(
      <MemoryRouter>
        <MainHeader />
      </MemoryRouter>
    );

    const toggleMenuButton = screen.getByLabelText("Show menu");
    fireEvent.click(toggleMenuButton);

    expect(screen.getByLabelText("Hide menu")).toBeInTheDocument();
    fireEvent.click(document.body);

    expect(screen.getByLabelText("Show menu")).toBeInTheDocument();
  });
});
