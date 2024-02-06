import {
  ADD_BOOKING,
  EDITING_BOOKING,
  REMOVE_BOOKING,
  UPDATE_BOOKING,
} from "./actionTypes";

export const getActions = (dispatch) => ({
  addBooking: (booking) => {
    dispatch({ type: ADD_BOOKING, payload: booking });
  },
  removeBooking: (bookingId) => {
    dispatch({ type: REMOVE_BOOKING, payload: bookingId });
  },
  updateBooking: (booking) => {
    dispatch({ type: UPDATE_BOOKING, payload: booking });
  },
  startEditingBooking: (booking) => {
    dispatch({ type: EDITING_BOOKING, payload: booking });
  },
  stopEditingBooking: () => {
    dispatch({ type: EDITING_BOOKING, payload: null });
  },
});
