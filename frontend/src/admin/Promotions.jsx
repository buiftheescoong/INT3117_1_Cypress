import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import AddPromotion from "./AddPromotion";

const PromotionPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [showForm, setShowForm] = useState(false);
    
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

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleSavePromotion = () => {
    fetchPromotions(); 
    setShowForm(false);
  };

  return (
    <div className="flex bg-gray-100 pf-[280px] min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 pl-[280px] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#00008B]">Promotions</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#00008B] text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            + New Promotion
          </button>
        </div>

        {/* Card Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promotion) => (
            <div
              key={promotion._id}
              className="bg-white border border-gray-300 rounded-lg shadow-md overflow-auto hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={promotion.imageUrl}
                alt={promotion.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {promotion.title}
                </h3>
                <p className="text-sm text-gray-600">{promotion.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Promotion Form */}
        {showForm && (
          <AddPromotion
            onSave={handleSavePromotion}
            onCancel={() => setShowForm(false)}
          />
        )}
      </main>
    </div>
  );
};

export default PromotionPage;
