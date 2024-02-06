import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navigate, useParams } from "react-router-dom";
import { BookingNew } from "./BookingNew";
import { useBookingContext } from "../../context/useBookingContext";
import { BookingForm } from "../../components/BookingForm/BookingForm";
import { PropertyCard } from "../../../property/components/PropertyCard/PropertyCard";
import { properties } from "../../../property/data/properties-mock.json";

const navigateMock = vi.fn();

vi.mock("react-router-dom", () => ({
  Navigate: vi.fn(),
  useParams: vi.fn(() => ({ propertyId: undefined })),
  useNavigate: vi.fn(() => navigateMock),
}));

vi.mock("../../context/useBookingContext", () => ({
  useBookingContext: vi.fn(() => ({
    bookings: [],
    actions: {},
  })),
}));

vi.mock("../../components/BookingForm/BookingForm", () => ({
  BookingForm: vi.fn(() => <form data-testid="booking-form" />),
}));

vi.mock("../../../property/components/PropertyCard/PropertyCard", () => ({
  PropertyCard: vi.fn(() => <div data-testid="property-card" />),
}));

window.alert = vi.fn();

describe("BookingNew", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to /new/property if propertyId is not provided", () => {
    useParams.mockImplementation(() => ({ propertyId: undefined }));

    render(<BookingNew />);

    expect(Navigate).toHaveBeenCalledWith(
      {
        replace: true,
        to: "/new/property",
      },
      {}
    );
  });

  it("renders booking form with selected property", async () => {
    useParams.mockReturnValue({ propertyId: "1" });

    useBookingContext.mockReturnValue({
      bookings: [],
      actions: {
        addBooking: vi.fn(),
      },
    });

    render(<BookingNew />);

    expect(screen.getByText("Schedule a new booking"));
    expect(screen.getByTestId("booking-form"));
    expect(screen.getByTestId("property-card"));
    expect(PropertyCard).toHaveBeenCalledWith(
      {
        ...properties[0],
        showFullInformations: true,
      },
      {}
    );
  });

  it("handle submit properly", async () => {
    const addBookingMock = vi.fn();

    useBookingContext.mockReturnValue({
      bookings: [],
      actions: {
        addBooking: addBookingMock,
      },
    });
    render(<BookingNew />);

    BookingForm.mock.calls[0][0].onSubmit({
      period: ["1/2/2023", "1/2/2023"],
    });

    expect(addBookingMock).toHaveBeenCalledWith({
      endDate: "2023-01-02",
      propertyId: "1",
      startDate: "2023-01-02",
    });
    expect(navigateMock).toHaveBeenCalledWith("/");
    expect(window.alert).toHaveBeenCalledWith("Booked with success");
  });
});