import React, {useState, useEffect} from "react";
import Sidebar from "./components/Sidebar";
import AddFlight from "./AddFlight";
import EditFlight from "./EditFlight";
import axios from "axios";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);  
  const [selectedFlight, setSelectedFlight] = useState(null);
  
  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/flights/getAllFlights");
      setFlights(response.data); 
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleEdit = (flight) => {
    setSelectedFlight(flight); 
    setShowEditForm(true);
  };

  const handleSaveEdit = () => {
    fetchFlights();
    setShowEditForm(false);
    setSelectedFlight(null);
  };

  const handleSave = () => {
    fetchFlights();
    setShowForm(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 pl-[280px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#00008B]">All Flights</h1>
          <button
            className="bg-[#00008B] text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={() => setShowForm(true)}
          >
            + New Flight
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
            <thead className="bg-gray-200 text-gray-700 text-sm uppercase font-semibold">
              <tr>
                <th className="py-4 px-6 text-center">Flight No.</th>
                <th className="py-4 px-6 text-center">Aircraft</th>
                <th className="py-4 px-6 text-center">Departure</th>
                <th className="py-4 px-6 text-center">Arrival</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Class Info</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {flights.length > 0 ? (
                flights.map((flight) => (
                  <tr key={flight._id} className="border-t hover:bg-gray-50 transition">
                    {/* Flight Number */}
                    <td className="py-4 px-6 text-center font-medium">
                      {flight.flightNumber}
                    </td>

                    {/* Aircraft */}
                    <td className="py-4 px-6 text-center">
                      {flight.airline.airlineCode}
                      <img
                        src={flight.airline.airlineLogo}
                        alt="Logo"
                        className="h-10 mx-auto mt-2"
                      />
                    </td>

                    {/* Departure */}
                    <td className="py-4 px-6 text-center">
                      <p className="font-bold">{flight.from.nameLocation} ({flight.from.airportCode})</p>
                      <p className="text-sm text-gray-600">
                        {flight.departDate.date} {flight.departDate.time}
                      </p>
                    </td>

                    {/* Arrival */}
                    <td className="py-4 px-6 text-center">
                      <p className="font-bold">{flight.to.nameLocation} ({flight.to.airportCode})</p>
                      <p className="text-sm text-gray-600">
                        {flight.arriveDate.date} {flight.arriveDate.time}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            flight.status === "OK"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {flight.status}
                        </span>
                      </div>
                    </td>

                    {/* Class Info */}
                    <td className="py-4 px-6 text-center">
                      {flight.seatDetails.map((seat) => (
                        <div key={seat._id} className="mb-2">
                          <p className="font-semibold">{seat.classType}:</p>
                          <p>
                            Booked: {seat.seats.filter(s => s.status === "booked").length} | Available:{" "}
                            {seat.seats.filter(s => s.status === "available").length}
                          </p>
                        </div>
                      ))}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-center">
                      <button onClick={() => handleEdit(flight)} className="text-blue-500 font-semibold hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-500">
                    No flights found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Form */}
        {showForm && <AddFlight onCancel={() => setShowForm(false)} onSave={handleSave} />}
        {showEditForm && <EditFlight flight={selectedFlight} onCancel={() => {setShowEditForm(false); selectedFlight(null);}} onSave={handleSaveEdit}/>}  
      </main>
    </div>
  );
    
};

export default Flights;
