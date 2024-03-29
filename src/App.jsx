import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./modules/shared/layouts/DefaultLayout/DefaultLayout";
import { BookingList } from "./modules/booking/pages/BookingList/BookingList";
import { BookingNew } from "./modules/booking/pages/BookingNew/BookingNew";
import { PropertySelectList } from "./modules/property/pages/PropertySelectList/PropertySelectList";
import { BookingContextProvider } from "./modules/booking/context/BookingContextProvider";

export const App = () => (
  <BookingContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/:bookingId?" element={<BookingList />} />
          <Route path="/create">
            <Route index element={<PropertySelectList />} />
            <Route path=":propertyId" element={<BookingNew />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </BookingContextProvider>
);
