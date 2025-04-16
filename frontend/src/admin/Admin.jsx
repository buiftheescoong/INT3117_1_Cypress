import React, {useState, useEffect} from "react";
import StatCard from "./components/StatCard";
import Sidebar from "./components/Sidebar";
import axios from "axios";

const Admin = () => {
  const [promotions, setPromotions] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  
    
  const fetchPromotions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/promotions/getAllPromotions"
      );
      setPromotions(response.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };
  const fetchAircrafts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/aircrafts/getAllAircrafts");
      setAircrafts(response.data); 
    } catch (error) {
      console.error("Error fetching aircrafts:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings/getAllBookings");
      setBookings(response.data); 
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/flights/getAllFlights");
      setFlights(response.data); 
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    fetchPromotions();
    fetchAircrafts();
    fetchBookings();
    fetchFlights();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 ">
      <Sidebar/>
      {/* Main Content */}
      <main className="flex-1 pl-[280px] p-8 bg-gradient-to-b from-gray-50 to-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-800 bg-gradient-to-r from-[#00008B] to-blue-400 bg-clip-text text-transparent mb-6">
  Welcome back, Administrator!
        </h1>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value={flights.length} label="Total Flights" />
          <StatCard value={bookings.length} label="Total Bookings" />
          <StatCard value={aircrafts.length} label="Total Aircrafts" />
          <StatCard value={promotions.length} label="Promotions" />
        </div>
      </main>
    </div>
  );
};

export default Admin;
