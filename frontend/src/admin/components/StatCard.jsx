import React from "react";

const StatCard = ({ value, label }) => {
  return (
    <div className="p-6 rounded-lg shadow-md text-center bg-blue-100 hover:shadow-lg hover:bg-blue-200 transition-all duration-200">
      <h2 className="text-4xl font-extrabold text-gray-800">{value}</h2>
      <p className="mt-2 text-lg font-medium text-gray-700">{label}</p>
    </div>
  );
};

export default StatCard;
