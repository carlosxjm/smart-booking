import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookingItem } from "../../components/BookingItem/BookingItem";
import { useBookingContext } from "../../context/useBookingContext";
import { properties } from "../../../property/data/properties-mock.json";
import { BookingEditModal } from "../../components/BookingEditModal/BookingEditModal";
import { BookingDetailsModal } from "../../components/BookingDetailsModal/BookingDetailsModal";
import "./BookingList.css";
import { BookiingRemoveConfirmModal } from "../../components/BookiingRemoveConfirmModal/BookiingRemoveConfirmModal";

export const BookingList = () => {
  const [editingBooking, setEditingBooking] = useState(null);
  const [deletingBooking, setDeletingBooking] = useState(null);
  const { bookings, actions } = useBookingContext();
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
            onRemoveClick={() => setDeletingBooking(booking)}
            onEditClick={() => setEditingBooking(booking)}
          />
        ))}
      </div>
      <BookingEditModal
        booking={editingBooking}
        onClose={() => setEditingBooking(null)}
        property={propertiesObject[editingBooking?.propertyId]}
      />
      <BookingDetailsModal
        booking={bookingDetail}
        onClose={() => navigate("/")}
        property={propertiesObject[bookingDetail?.propertyId]}
      />
      <BookiingRemoveConfirmModal
        booking={deletingBooking}
        onConfirm={() => actions.removeBooking(deletingBooking.id)}
        onClose={() => setDeletingBooking(null)}
      />
    </>
  );
};
