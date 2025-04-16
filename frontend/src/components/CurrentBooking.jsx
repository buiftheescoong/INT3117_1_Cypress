import React, {useEffect, useState} from "react";
import "../CurrentBooking.css";
import axios from "axios";
const CurrentBooking = () => {
  const [bookings, setBookings] = useState([]);
  
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings/getAllBookings");
      setBookings(response.data); 
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

useEffect(() => {
     fetchBookings();
   }, []);
  
  return (
    <div className="max-w-[1400px] pb-[30px] mx-auto">
    <h1 className="text-[2.7em] font-bold text-white mb-[30px] mt-[20px] text-center ">Current Booking</h1>
    <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
      <thead className="bg-gray-200 text-gray-700 text-sm uppercase font-semibold">
        <tr>
          <th className="py-4 px-6 text-center">Flight No.</th>
          <th className="py-4 px-6 text-center">Aircraft</th>
          <th className="py-4 px-6 text-center">Departure</th>
          <th className="py-4 px-6 text-center">Arrival</th>
          <th className="py-4 px-6 text-center">Seat Class</th>
          <th className="py-4 px-6 text-center">Seat Number</th>
          <th className="py-4 px-6 text-center">Total Price</th>
          <th className="py-4 px-6 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => (
          <tr key={index} className="border-t hover:bg-gray-50 transition">
            <td className="py-4 px-6 text-center">{booking.flight.flightNumber}</td>
            <td className="py-4 px-6 text-center">{booking.flight.airline.airlineCode}</td>
            <td className="py-4 px-6 text-center">
              <p className="font-semibold">{booking.flight.from.nameLocation}</p>
              <p className="text-gray-500 text-sm">{booking.flight.departDate.date} {booking.flight.departDate.time}</p>
            </td>
            <td className="py-4 px-6 text-center">
              <p className="font-semibold">{booking.flight.to.nameLocation}</p>
              <p className="text-gray-500 text-sm">{booking.flight.arriveDate.date} {booking.flight.arriveDate.time}</p>
            </td>
            <td className="py-4 px-6 text-center">{booking.classType}</td>
            <td className="py-4 px-6 text-center">{booking.seatNumber}</td>
            <td className="py-4 px-6 text-center">{booking.price}</td>
            <td className="py-4 px-6 text-center">
              <button onClick={() => handleEdit(flight)} className="text-blue-500 font-semibold hover:underline">
                Cancel
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
 
  );
};

export default CurrentBooking;
