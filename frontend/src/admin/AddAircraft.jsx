import React, { useState, useEffect } from "react";
import axios from "axios"; 

const AddAircraft = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    code: "",
    manufacturer: "",
    logo: "",
    seatClasses: [
      { classType: "Economy", capacity: 0 },
      { classType: "Business", capacity: 0 },
    ],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.airlineCode,
        manufacturer: initialData.airlineManifacturing,
        logo: initialData.airlineLogo,
        seatClasses: initialData.seatClasses.map((cls) => ({
          classType: cls.classType,
          capacity: cls.seats.length,
        })),
      });
    }
  }, [initialData]);

   // Generate seats based on class type and capacity
   const generateSeats = (classType, capacity) => {
    const seats = [];
    const prefix = classType === "Economy" ? "A" : "B";
    for (let i = 1; i <= capacity; i++) {
      seats.push(`${prefix}${i}`);
    }
    return seats;
  };

  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // Handle seat class changes
  const handleSeatClassChange = (index, value) => {
    const updatedClasses = [...formData.seatClasses];
    updatedClasses[index].capacity = Number(value);
    setFormData({ ...formData, seatClasses: updatedClasses });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
          // Create seat list for each class type
          const updatedSeatClasses = formData.seatClasses.map((cls) => ({
            classType: cls.classType,
            seats: generateSeats(cls.classType, cls.capacity),
          }));
      
          // Final form data with generated seats
          const finalData = {
            airlineManifacturing: formData.manufacturer,
            airlineCode: formData.code,
            airlineLogo: formData.logo,
            seatClasses: updatedSeatClasses,
          };
          
          if (initialData) {
            await axios.put(
              `http://localhost:5000/api/aircrafts/updateAircraft/${initialData._id}`,
              finalData
            );
          } else {
            await axios.post("http://localhost:5000/api/aircrafts/addAircraft", finalData);
          }
         
          onSave(formData);
          setFormData({
            code: "",
            manufacturer: "",
            logo: "",
            seatClasses: [
              { classType: "Economy", capacity: 0 },
              { classType: "Business", capacity: 0 },
            ],
          });
    } catch (error) {
      console.error("Error adding new aircraft:", error);
      alert("Failed to add aircraft. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl pf-[200px] font-bold mb-4">Add New Aircraft</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Aircraft Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Logo URL</label>
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {formData.seatClasses.map((cls, index) => (
              <div key={index}>
                <label className="block font-medium">
                  {cls.classType} Seats
                </label>
                <input
                  type="number"
                  value={cls.capacity}
                  onChange={(e) => handleSeatClassChange(index, e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            ))}
          </div>
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

export default AddAircraft;
