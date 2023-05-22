import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Booking from "../pages/Booking";
import BookingList from "../pages/BookingList";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reservas" element={<Booking />} />
      <Route path="/bookingList" element={<BookingList />} />
    </Routes>
  );
}

export default RoutesApp;
