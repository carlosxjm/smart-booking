import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BookingEditModal } from "./BookingEditModal";
import { BookingForm } from "../BookingForm/BookingForm";

const updateBookingMock = vi.fn();

vi.mock("../../context/useBookingContext", () => ({
  useBookingContext: vi.fn(() => ({
    bookings: [],
    actions: {
      updateBooking: updateBookingMock,
    },
  })),
}));

vi.mock("../BookingForm/BookingForm", () => ({
  BookingForm: vi.fn(() => <form data-testid="bookingForm" />),
}));

describe("BookingEditModal", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const onCloseMock = vi.fn();
  const mockBooking = {
    id: "1",
    guestName: "John Doe",
    startDate: new Date("2024-02-10"),
    endDate: new Date("2024-02-15"),
    propertyId: "123",
  };
  const mockProperty = {
    id: "123",
    name: "Test Property",
  };

  it("renders properly", () => {
    render(
      <BookingEditModal
        booking={mockBooking}
        property={mockProperty}
        onClose={onCloseMock}
      />
    );

    expect(screen.getByText("Edit booking")).toBeInTheDocument();
  });

  it("calls update action on onSubmit", () => {
    render(
      <BookingEditModal
        booking={mockBooking}
        property={mockProperty}
        onClose={onCloseMock}
      />
    );

    const formDataMock = {
      guestName: "Jane Doe",
      period: ["2024-02-20", "2024-02-25"],
    };

    BookingForm.mock.calls[0][0].onSubmit(formDataMock);

    expect(updateBookingMock).toHaveBeenCalledWith({
      guestName: "Jane Doe",
      endDate: "2024-02-24",
      startDate: "2024-02-19",
    });
  });
});
