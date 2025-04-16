import React, { useState, useEffect } from "react";
import axios from "axios";

const AddAirport = ({ onSave, onCancel, initialData}) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    code: "",
  });
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.airport,
        location: initialData.nameLocation,
        code: initialData.airportCode,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalData = {
        nameLocation: formData.location,
         airport: formData.name, 
         airportCode: formData.code,
      }

      if (initialData) {
        // Update existing airport
        await axios.put(
          `http://localhost:5000/api/airports/updateAirport/${initialData._id}`,
          finalData
        );
      } else {
        // Add new airport
        await axios.post("http://localhost:5000/api/airports/addAirport", finalData);
      }
  
      onSave(formData)
      setFormData({
        name: "",
        location: "",
        code: "",
      });

    } catch (error) {
      console.error("Error adding new airport:", error);
      alert("Failed to add airport. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">New Airport</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Airport Name */}
          <div>
            <label className="block font-medium">Airport Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Enter airport name"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Enter location"
              required
            />
          </div>

          {/* Code */}
          <div>
            <label className="block font-medium">Airport Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Enter airport code"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAirport;
