import { afterEach, describe, expect, it, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { BookingForm } from "./BookingForm";
import { formErrorMessages } from "./formErrorMessages";
import { useForm } from "react-hook-form";

vi.mock("react-hook-form", () => ({
  useForm: vi.fn().mockImplementation(() => ({
    control: vi.fn(),
    register: vi.fn(() => ({})),
    handleSubmit: vi.fn((onSubmit) => onSubmit),
    formState: { errors: {} },
  })),
  Controller: vi.fn(() => <input id="period" />),
}));

const mockBooking = {
  guestName: "John Doe",
  contactNumber: "1234567890",
  startDate: "2024-02-04",
  endDate: "2024-02-05",
};

const mockExistingBookings = [];
describe("BookingForm", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockOnSubmit = vi.fn((event) => event.preventDefault());

  it("renders properly", () => {
    render(
      <BookingForm
        booking={mockBooking}
        existingBookings={mockExistingBookings}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByLabelText("Period")).toBeInTheDocument();
    expect(screen.getByLabelText("Guest name")).toBeInTheDocument();
    expect(screen.getByLabelText("Contact number")).toBeInTheDocument();
    expect(screen.getByText("Reserve")).toBeInTheDocument();
  });

  it("submits the form with valid data", () => {
    const { getByLabelText, getByText } = render(
      <BookingForm
        booking={mockBooking}
        existingBookings={mockExistingBookings}
        onSubmit={mockOnSubmit}
      />
    );

    fireEvent.change(getByLabelText("Guest name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText("Contact number"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(getByText("Reserve"));

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("shows form validation error messages", () => {
    useForm.mockImplementationOnce(() => ({
      control: vi.fn(),
      register: vi.fn(() => ({})),
      handleSubmit: vi.fn((onSubmit) => onSubmit),
      formState: {
        errors: {
          period: {
            type: "required",
          },
          guestName: {
            type: "required",
          },
          contactNumber: {
            type: "minLength",
          },
        },
      },
    }));

    render(
      <BookingForm
        booking={mockBooking}
        existingBookings={mockExistingBookings}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText(formErrorMessages.period.required));
    expect(screen.getByText(formErrorMessages.guestName.required));
    expect(screen.getByText(formErrorMessages.contactNumber.minLength));
  });
});
