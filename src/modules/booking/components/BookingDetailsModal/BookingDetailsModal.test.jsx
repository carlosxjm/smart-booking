import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BookingDetailsModal } from "./BookingDetailsModal";
import { PropertyCard } from "../../../property/components/PropertyCard/PropertyCard";
import { Modal } from "../../../shared/components/Modal/Modal";

vi.mock("../../../property/components/PropertyCard/PropertyCard", () => ({
  PropertyCard: vi.fn(() => <div data-testid="property-card" />),
}));

vi.mock("../../../shared/components/Modal/Modal", () => ({
  Modal: vi.fn(({ children }) => <div>{children}</div>),
}));

describe("BookingDetailsModal", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const booking = {
    id: 1,
    guestName: "John Doe",
    startDate: "2022-01-01",
    endDate: "2022-01-05",
    contactNumber: "1234567890",
  };

  const property = {
    title: "Sample Property",
  };

  it("renders properly", () => {
    render(
      <BookingDetailsModal
        booking={booking}
        property={property}
        onClose={() => {}}
      />
    );

    expect(screen.getByTestId("property-card")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("01/01/2022")).toBeInTheDocument();
    expect(screen.getByText("01/05/2022")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(PropertyCard).toHaveBeenCalledWith(property, {});
  });

  it("shows modal when there's a booking selected", () => {
    render(
      <BookingDetailsModal
        booking={booking}
        property={property}
        onClose={() => {}}
      />
    );

    expect(Modal).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpen: true,
      }),
      {}
    );
  });

  it("doesn't show modal when there isn't a booking selected", () => {
    render(<BookingDetailsModal property={property} onClose={() => {}} />);

    expect(Modal).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpen: false,
      }),
      {}
    );
  });
});
