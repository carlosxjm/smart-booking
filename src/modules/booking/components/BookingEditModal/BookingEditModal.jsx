import { useBookingContext } from "../../context/useBookingContext";
import { formatDateToSave } from "../../../shared/utils/date/formatDateToSave";
import { Modal } from "../../../shared/components/Modal/Modal";
import { BookingForm } from "../BookingForm/BookingForm";
import { PropertyCard } from "../../../property/components/PropertyCard/PropertyCard";
import "./BookingEditModal.css";

export const BookingEditModal = ({ booking, property, onClose }) => {
  const { bookings, actions } = useBookingContext();

  const selectedPropertyBookings = bookings.filter(
    ({ id, propertyId }) =>
      propertyId === booking?.propertyId && id !== booking.id
  );

  const handleSubmit = (formData) => {
    actions.updateBooking({
      guestName: formData.guestName,
      startDate: formatDateToSave(formData.period[0]),
      endDate: formatDateToSave(formData.period[1]),
    });
  };

  return (
    <Modal title="Edit booking" isOpen={!!booking} onClose={onClose}>
      <div className="booking-edit-modal-root">
        <PropertyCard {...property} />
        <BookingForm
          onSubmit={handleSubmit}
          booking={booking}
          existingBookings={selectedPropertyBookings}
        />
      </div>
    </Modal>
  );
};
