import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import AddAirport from "./AddAirport";
import axios from "axios";

const Airports = () => {
  const [airports, setAirports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState(null);

  const fetchAirports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/airports/getAllAirports");
      setAirports(response.data); 
    } catch (error) {
      console.error("Error fetching airports:", error);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  const handleSave = () => {
    fetchAirports();
    setShowForm(false);
    setSelectedAirport(null);
  };

  const handleEdit = (airport) => {
    setSelectedAirport(airport); 
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/airports/deleteAirport/${id}`);
      fetchAirports(); 
    } catch (error) {
      console.error("Error deleting airport:", error);
    }
  };
 
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 pl-[280px] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#00008B]">Manage Airports</h1>
          <button
            onClick={() => { 
              setSelectedAirport(null);
              setShowForm(true);
            }}
            className="bg-[#00008B] text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            + New Airport
          </button>
        </div>

        {/* Table */}
        <div className="overflow-y-auto max-h-[90%] mt-4">
          <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
            <thead className="bg-gray-200 text-gray-700 text-sm uppercase font-semibold">
              <tr>
                <th className="py-4 px-6 text-center">Airport Code</th>
                <th className="py-4 px-6 text-center">Airport Name</th>
                <th className="py-4 px-6 text-center">Location</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {airports.map((airport, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition">
                  <td className="py-4 px-6 text-center">{airport.airportCode}</td>
                  <td className="py-4 px-6 text-center">{airport.airport}</td>
                  <td className="py-4 px-6 text-center">{airport.nameLocation}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleEdit(airport)}
                      className="text-blue-500 font-semibold hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(airport._id)}
                      className="text-red-500 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form */}
        {showForm && (
          <AddAirport
            onSave={handleSave}
            onCancel={() => {setShowForm(false); selectedAirport(null);}}
            initialData={selectedAirport}
          />
        )}
      </div>
    </div>
  );
};

export default Airports;