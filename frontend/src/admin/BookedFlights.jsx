import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import axios from "axios";
const BookedFlights = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filterType, setFilterType] = useState("flight");
  const [input, setInput] = useState("")
  const [typeInput, setTypeInput] = useState("text")
  const [placeholder, setPlaceHolder] = useState("Enter value")

  const getInputProps = () => {
    console.log(filterType)
    if (filterType === "departure_date") {
      setTypeInput("date");
      setPlaceHolder("Enter date");
    } else {
      setTypeInput("text");
      setPlaceHolder("Enter value");
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

const filterByFlightNumber = (bookings, flightNumber) => {
  return bookings.filter(booking => booking.flight.flightNumber === flightNumber);
};

const filterByUserName = (bookings, userName) => {
  return bookings.filter(booking => booking.user.name.toLowerCase() === userName.toLowerCase());
};

const filterByDepartureLocation = (bookings, location) => {
  return bookings.filter(booking => booking.flight.from.nameLocation.toLowerCase() == location.toLowerCase());
}  

const filterByDepartureDate = (bookings, date) => {
  return bookings.filter(booking => booking.flight.departDate.date === date);
}
useEffect(() => {
     fetchBookings();
   }, []);

useEffect(() => {
    getInputProps();
    setInput("");
}, [filterType]); 


useEffect(()=>{
  setFilteredBookings(bookings);
}, [bookings])
  
const handleFilterByFlightNumber = () => {
    const result = filterByFlightNumber(bookings, input);
    setFilteredBookings(result);
};

const handleFilterByUserName = () => {
  const result = filterByUserName(bookings, input);
  setFilteredBookings(result);
};

const handleFilterByDepartureLocation = () => {
  const result = filterByDepartureLocation(bookings, input);
  setFilteredBookings(result)
}
const handleFilterByDepartureDate = () => {
  const result = filterByDepartureDate(bookings, input);
  setFilteredBookings(result)
}

const handleSearch = () => {
  if (input) {
    if (filterType === "flight") {
      handleFilterByFlightNumber();
      console.log("flight")
    } else if (filterType === "user") {
      handleFilterByUserName();
      console.log("user")
    } else if (filterType === "departure_location") {
      handleFilterByDepartureLocation();
      console.log("departure location");
    } else if (filterType === "departure_date") {
      handleFilterByDepartureDate();
      console.log("departure date")
    }
  } else {
    alert("Please enter filter data")
  }
};

const calculateTotalPrice = () => {
  return filteredBookings.reduce((total, booking) => total + booking.price, 0);
};

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 pl-[280px] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#00008B]">Manage Bookings</h1>
        </div>


        {/* Filters and Summary */}
        <div className="flex justify-between items-center mb-4">
          {/* Filter Dropdown and Input */}
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="flight">Flight</option>
              <option value="user">User</option>
              <option value="departure_location">Departure Location</option>      
              <option value="departure_date">Departure Date</option>        
            </select>
            <input
              type={typeInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="border rounded px-3 py-2"
            />
            <button
              onClick={handleSearch}
              className="bg-[#00008B] text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>

          {/* Results Summary */}
          <div>
            <p className="font-bold">Results: {filteredBookings.length}</p>
          </div>
          <div> 
            <p className="font-bold">Total Price: {calculateTotalPrice()}</p>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
            <thead className="bg-gray-200 text-gray-700 text-sm uppercase font-semibold">
              <tr>
                <th className="py-4 px-6 text-center">User</th>
                <th className="py-4 px-6 text-center">Flight No.</th>
                <th className="py-4 px-6 text-center">Aircraft</th>
                <th className="py-4 px-6 text-center">Departure</th>
                <th className="py-4 px-6 text-center">Arrival</th>
                <th className="py-4 px-6 text-center">Seat Class</th>
                <th className="py-4 px-6 text-center">Seat Number</th>
                <th className="py-4 px-6 text-center">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition">
                  <td className="py-4 px-6 text-center">{booking.user.name}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default BookedFlights;