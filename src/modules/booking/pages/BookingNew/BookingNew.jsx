import { properties } from "../../../property/data/properties-mock.json";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { BookingForm } from "../../components/BookingForm/BookingForm";
import { PropertyCard } from "../../../property/components/PropertyCard/PropertyCard";
import { useBookingContext } from "../../context/useBookingContext";
import { formatDateToSave } from "../../../shared/utils/date/formatDateToSave";
import "./BookingNew.css";

export const BookingNew = () => {
  const { propertyId } = useParams();
  const { bookings, actions } = useBookingContext();
  const navigate = useNavigate();

  if (!propertyId) {
    return <Navigate to="/new/property" replace />;
  }

  const selectedProperty = properties.find(({ id }) => id === +propertyId);

  const selectedPropertyBookings = bookings.filter(
    (booking) => booking.propertyId === +propertyId
  );

  const handleSubmit = (formData) => {
    const { period, ...otherData } = formData;

    actions.addBooking({
      ...otherData,
      propertyId: propertyId,
      startDate: formatDateToSave(period[0]),
      endDate: formatDateToSave(period[1]),
    });

    window.alert("Booked with success");
    navigate("/");
  };

  return (
    <>
      <h1>Schedule a new booking</h1>
      <div className="booking-new-root">
        <div className="property-card-wrapper">
          <PropertyCard {...selectedProperty} showFullInformations />
        </div>
        <BookingForm
          onSubmit={handleSubmit}
          existingBookings={selectedPropertyBookings}
        />
      </div>
    </>
  );
};
