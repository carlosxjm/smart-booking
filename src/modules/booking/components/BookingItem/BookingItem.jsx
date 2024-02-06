import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/Button/Button";
import { formatDateToShow } from "../../../shared/utils/date/formatDateToShow";
import "./BookingItem.css";

export const BookingItem = ({
  id,
  guestName,
  startDate,
  endDate,
  propertyTitle,
  propertyImage,
  onRemoveClick,
  onEditClick,
}) => (
  <div className="booking-item-root">
    <div className="info-wrapper">
      <div className="property-image-wrapper">
        <img src={propertyImage} className="property-image" />
      </div>
      <div className="info">
        <p>
          {formatDateToShow(startDate)}{" "}
          {startDate !== endDate && `- ${formatDateToShow(endDate)}`}
        </p>
        <p className="text-small">{propertyTitle}</p>
        <p className="text-small">Booked for {guestName}</p>
      </div>
    </div>
    <div className="actions">
      <Button onClick={() => onEditClick(id)} variant="text">
        Edit
      </Button>
      <Link to={`/${id}`}>
        <Button variant="text" tabIndex="-1">
          Details
        </Button>
      </Link>
      <Button
        variant="icon"
        aria-label="Remove Booking"
        onClick={onRemoveClick}
      >
        <img src="/images/icons/trash-icon.svg" aria-hidden />
      </Button>
    </div>
  </div>
);
