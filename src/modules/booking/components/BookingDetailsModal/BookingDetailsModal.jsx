import { Modal } from "../../../shared/components/Modal/Modal";
import { PropertyCard } from "../../../property/components/PropertyCard/PropertyCard";
import { formatDateToShow } from "../../../shared/utils/date/formatDateToShow";
import "./BookingDetailsModal.css";

export const BookingDetailsModal = ({ booking = {}, property, onClose }) => {
  return (
    <Modal title="Booking details" isOpen={!!booking.id} onClose={onClose}>
      <div className="booking-details-modal-root">
        <div className="property-card-wrapper">
          <PropertyCard {...property} />
        </div>
        <div className="booking-info-wrapper">
          <p>
            <span>Guest name:</span> {booking.guestName}
          </p>
          <p>
            <span>Starting:</span> {formatDateToShow(booking.startDate)}
          </p>
          <p>
            <span>Ending:</span> {formatDateToShow(booking.endDate)}
          </p>
          <p>
            <span>Contact:</span> {booking.contactNumber}
          </p>
        </div>
      </div>
    </Modal>
  );
};
