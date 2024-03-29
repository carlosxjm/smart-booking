import { ADD_BOOKING, REMOVE_BOOKING, UPDATE_BOOKING } from "./actionTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_BOOKING:
      return {
        ...state,
        bookings: [
          {
            id: crypto.randomUUID(),
            ...action.payload,
          },
          ...state.bookings,
        ],
      };
    case REMOVE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking.id !== action.payload
        ),
      };
    case UPDATE_BOOKING:
      return {
        ...state,
        editingBooking: null,
        bookings: state.bookings.map((booking) =>
          booking.id === action.payload.id
            ? {
                ...booking,
                ...action.payload,
              }
            : booking
        ),
      };
    default:
      return state;
  }
};
