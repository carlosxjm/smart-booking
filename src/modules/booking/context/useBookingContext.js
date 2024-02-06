import { useContext } from "react";
import { bookingContext } from "./context";

export const useBookingContext = () => {
  return useContext(bookingContext);
};
