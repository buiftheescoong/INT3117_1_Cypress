import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Home from "../page/Home";
import Login from "../page/Login";
import SignUp from "../page/SignUp";
import ErrorPage from "../page/ErrorPage";
import Admin from "../admin/Admin";
import TicketSearchPage from "../page/TicketSearchPage";
import CurrentBooking from "../components/currentBooking/CurrentBooking.jsx";
import Flights from "../admin/Flights"
import Aircrafts from "../admin/Aircrafts";
import TicketBooking from "../page/TicketBooking";
import BookingGuide from "../components/BookingGuide/BookingGuide";
import Airports from "../admin/Airports";
import BookedFlights from "../admin/BookedFlights";
import BaoHiem from "../page/BaoHiem";
import DichVuTaxi from "../page/DichVuTaxi";
import CheckoutPage from "../page/CheckoutPage"
import PromotionPage from "../admin/Promotions";

const AppRoutes = () => {

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  
  const location = useLocation();

  const ProtectedRoute = ({ element: Element, ...rest }) => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    console.log("check is Admin : " + isAdmin);
    return isAdmin ? <Element {...rest} /> : <Navigate to="/" replace />;
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
  
  }, [location]);

  return (
    <div className="w-full h-screen bg-custom-gradient">
       {!isAdmin && <Navbar />}
       <div className={isAdmin ? "mt-[0px]" : ""}>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/bookgui" element={<BookingGuide />} />
        <Route path="/book" element={<TicketSearchPage />} />
        <Route path="/book/:id/:classType" element={<TicketBooking />} />
        <Route path="/bookings" element={<CurrentBooking />} />
        <Route path="/checkout-page" element={<CheckoutPage />} />
        <Route path="/admin" element={<ProtectedRoute element={Admin} />} />
        <Route path="/admin/flights" element={<Flights />} />
        <Route path="/admin/aircrafts" element={<Aircrafts />} />
        <Route path="/admin/airports" element={<Airports />} />
        <Route path="/admin/bookings" element={<BookedFlights />} />
        <Route path="/admin/promotions" element={<PromotionPage />} />
        
        <Route path="*" element={<ErrorPage />} />
        <Route path="/bh" element={<BaoHiem/>} />
        <Route path="/taxi" element={<DichVuTaxi/>} />
      </Routes>
      </div>
      {!isAdmin && <Footer />}
    </div>
  );
};

export default AppRoutes;
