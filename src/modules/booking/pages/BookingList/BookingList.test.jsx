import { afterEach, describe, expect, it, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { BookingList } from "./BookingList";
import { BookingEditModal } from "../../components/BookingEditModal/BookingEditModal";

const removeBookingMock = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(() => vi.fn()),
  useParams: vi.fn(() => ({})),
  Link: vi.fn(({ children, to }) => (
    <a data-testid="property-link" href={to}>
      {children}
    </a>
  )),
}));

vi.mock("../../context/useBookingContext", () => ({
  useBookingContext: vi.fn(() => ({
    bookings: [
      {
        id: "1",
        guestName: "John Doe",
        startDate: "2024-02-10",
        endDate: "2024-02-15",
        propertyId: "1",
      },
      {
        id: "2",
        guestName: "Jane Doe",
        startDate: "2024-02-20",
        endDate: "2024-02-25",
        propertyId: "2",
      },
    ],
    editingBooking: {
      id: "1",
      guestName: "John Doe",
      startDate: "2024-02-10",
      endDate: "2024-02-15",
      propertyId: "1",
    },
    actions: {
      removeBooking: removeBookingMock,
    },
  })),
}));

vi.mock("../../components/BookingEditModal/BookingEditModal", () => ({
  BookingEditModal: vi.fn(),
}));

describe("BookingList", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders properly", () => {
    render(<BookingList />);

    expect(screen.getByText("Bookings")).toBeInTheDocument();

    expect(screen.getByText("Booked for John Doe")).toBeInTheDocument();
    expect(screen.getByText("Booked for Jane Doe")).toBeInTheDocument();
  });

  it("removes booking", () => {
    render(<BookingList />);
    const removeButton = screen.getAllByLabelText("Remove Booking").at(0);

    fireEvent.click(removeButton);

    const confirmRemoveButton = screen.getByText("Yes, delete it!");

    fireEvent.click(confirmRemoveButton);

    expect(removeBookingMock).toHaveBeenCalled();
  });

  it("edits booking", () => {
    render(<BookingList />);
    const editButton = screen.getAllByText("Edit").at(0);
    fireEvent.click(editButton);

    expect(BookingEditModal).toHaveBeenCalledWith(
      expect.objectContaining({
        booking: {
          id: "1",
          guestName: "John Doe",
          startDate: "2024-02-10",
          endDate: "2024-02-15",
          propertyId: "1",
        },
      }),
      {}
    );
  });
});
