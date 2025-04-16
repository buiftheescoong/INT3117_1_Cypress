import React, { useState } from "react";
import axios from "axios";


const AddPromotion = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const handleSave = async (e) => {
    e.preventDefault();
   try {
    const finalData = {
        title: formData.title,
        content: formData.content,
        imageUrl: formData.imageUrl,
    }
    const response = await axios.post(
        "http://localhost:5000/api/promotions/addPromotion",
        finalData
    );     

    onSave(formData);
    setFormData({ title: "", content: "", imageUrl: "" });
   } catch (error) {
    console.error("Error creating promotion:", error);
    alert("Failed to add promotion. Please try again.");
   }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full pf-[280px] max-w-md">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 pf-[280px] mb-6 text-center">
          Add New Promotion
        </h2>
        
        {/* Form */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter title"
              required
            />
          </div>

          {/* Content Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
              placeholder="Enter description"
              required
            />
          </div>

          {/* Image URL Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Image URL
            </label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Image URL"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPromotion;
