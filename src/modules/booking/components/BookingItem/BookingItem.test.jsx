import { describe, expect, it, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { BookingItem } from "./BookingItem";

vi.mock("react-router-dom", () => ({
  Link: vi.fn(({ children, to }) => (
    <a data-testid="property-link" href={to}>
      {children}
    </a>
  )),
}));

describe("BookingItem", () => {
  const mockBooking = {
    id: "1",
    guestName: "John Doe",
    startDate: "2024-02-10",
    endDate: "2024-02-15",
    propertyTitle: "Test Property",
    propertyImage: "test-image-url",
    onRemoveClick: vi.fn(),
    onEditClick: vi.fn(),
  };

  it("renders booking item correctly", () => {
    render(<BookingItem {...mockBooking} />);

    expect(screen.getByText("02/10/2024 - 02/15/2024")).toBeInTheDocument();
    expect(screen.getByText("Test Property")).toBeInTheDocument();
    expect(screen.getByText("Booked for John Doe")).toBeInTheDocument();
    expect(screen.getByLabelText("Remove Booking")).toBeInTheDocument();
  });

  it("calls onRemoveClick when remove button is clicked", () => {
    render(<BookingItem {...mockBooking} />);

    fireEvent.click(screen.getByLabelText("Remove Booking"));

    expect(mockBooking.onRemoveClick).toHaveBeenCalled();
  });

  it("calls onEditClick with booking id when edit button is clicked", () => {
    render(<BookingItem {...mockBooking} />);

    fireEvent.click(screen.getByText("Edit"));

    expect(mockBooking.onEditClick).toHaveBeenCalledWith("1");
  });

  it("show only start date when start date and end date are equal", () => {
    const mockBookingOneDay = {
      ...mockBooking,
      endDate: mockBooking.startDate,
    };
    render(<BookingItem {...mockBookingOneDay} />);

    expect(
      screen.queryByText("02/10/2024 - 02/10/2024")
    ).not.toBeInTheDocument();
    expect(screen.getByText("02/10/2024")).toBeInTheDocument();
  });
});
