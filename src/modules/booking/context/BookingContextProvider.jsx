import { useReducer } from "react";

import bookingsMockData from "./data/bookings-mock.json";
import { bookingContext } from "./context";
import { getActions } from "./getActions";
import { reducer } from "./reducer";

const initialState = {
  bookings: bookingsMockData.bookings,
  editingBooking: null,
  loading: false,
};

export const BookingContextProvider = ({ children }) => {
  const { Provider } = bookingContext;
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = getActions(dispatch);

  return <Provider value={{ ...state, actions }}>{children}</Provider>;
};
