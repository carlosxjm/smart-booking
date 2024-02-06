import { useNavigate, useParams } from "react-router-dom";
import { BookingItem } from "../../components/BookingItem/BookingItem";
import { useBookingContext } from "../../context/useBookingContext";
import { properties } from "../../../property/data/properties-mock.json";
import { BookingEditModal } from "../../components/BookingEditModal/BookingEditModal";
import { BookingDetailsModal } from "../../components/BookingDetailsModal/BookingDetailsModal";
import "./BookingList.css";

export const BookingList = () => {
  const { bookings, editingBooking, actions } = useBookingContext();
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const propertiesObject = properties.reduce(
    (acc, property) => ({
      ...acc,
      [property.id]: property,
    }),
    {}
  );

  const bookingDetail =
    bookingId && bookings.find(({ id }) => bookingId === id);

  const handleRemoveBooking = (id) => {
    const hasConfirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (hasConfirmed) {
      actions.removeBooking(id);
    }
  };

  return (
    <>
      <h1>Bookings</h1>
      <div className="booking-list-root">
        {bookings.map((booking) => (
          <BookingItem
            key={booking.id}
            {...booking}
            propertyTitle={propertiesObject[booking.propertyId].title}
            propertyImage={propertiesObject[booking.propertyId].image}
            onRemoveClick={() => handleRemoveBooking(booking.id)}
            onEditClick={() => actions.startEditingBooking(booking)}
          />
        ))}
      </div>
      <BookingEditModal
        booking={editingBooking}
        onClose={() => actions.stopEditingBooking()}
        property={propertiesObject[editingBooking?.propertyId]}
      />
      <BookingDetailsModal
        booking={bookingDetail}
        onClose={() => navigate("/")}
        property={propertiesObject[bookingDetail?.propertyId]}
      />
    </>
  );
};
