import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import AddAircraft from "./AddAircraft";
import axios from "axios";

const Aircrafts = () => {
  const [aircrafts, setAircrafts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAircraft, setSelectedAircraft] = useState(null);

  const fetchAircrafts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/aircrafts/getAllAircrafts");
      setAircrafts(response.data); 
    } catch (error) {
      console.error("Error fetching aircrafts:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/aircrafts/deleteAircraft/${id}`);
      fetchAircrafts(); 
    } catch (error) {
      console.error("Error deleting aircraft:", error);
    }
  };
  const handleEdit = (aircraft) => {
    setSelectedAircraft(aircraft);
    setShowForm(true);
  };

  useEffect(() => {
    fetchAircrafts();
  }, []);

  const handleSave = () => {
    fetchAircrafts();
    setShowForm(false);
    setSelectedAircraft(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 pl-[280px] p-6">
        {/* Header */}
        <div className="flex justify-between pf-[280px] items-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#00008B]">Manage Aircrafts</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#00008B] text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            + New Aircraft
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
            <thead className="bg-gray-200 text-gray-700 text-sm uppercase font-semibold">
              <tr>
                <th className="py-4 px-6 text-center">Aircraft Code</th>
                <th className="py-4 px-6 text-center">Manufacturer</th>
                <th className="py-4 px-6 text-center">Logo</th>
                <th className="py-4 px-6 text-center">Seat Classes</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {aircrafts.length > 0 ? (
                aircrafts.map((aircraft, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition">
                    <td className="py-4 px-6 text-center">{aircraft.airlineCode}</td>
                    <td className="py-4 px-6 text-center">{aircraft.airlineManifacturing}</td>
                    <td className="py-4 px-6 text-center">
                      <img
                        src={aircraft.airlineLogo}
                        alt="Logo"
                        className="h-10 mx-auto"
                      />
                    </td>
                    <td className="py-4 px-6 text-center">
                      {aircraft.seatClasses.map((cls, idx) => (
                        <p key={idx}>
                          {cls.classType}: {cls.seats.length} seats
                        </p>
                      ))}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleEdit(aircraft)}
                        className="text-blue-500 font-semibold hover:underline mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(aircraft._id)}
                        className="text-red-500 font-semibold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-500">
                    No aircrafts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Form */}
        {showForm && (
          <AddAircraft onSave={handleSave} onCancel={() => {setShowForm(false); setSelectedAircraft(null);
          }} 
          initialData={selectedAircraft}
          />
        )}
      </div>
    </div>
  );
};

export default Aircrafts;
