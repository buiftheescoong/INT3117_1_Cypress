import React from "react";

const LetGetToKnow = () => {
  return (
    <div className="w-full h-auto overflow-auto rounded-[30px] bg-cover bg-center py-10 px-5 flex justify-center items-center min-h-[600px] bg-no-repeat bg-[url('https://thumbs.dreamstime.com/b/big-clound-seascape-view-airplane-window-189486954.jpg')] bg-[#F4F4F4] relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/30"></div>
      {/* Phần màu xanh */}
      <div
        className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-700 p-8 md:p-10 text-white flex flex-col items-center space-y-3"
        style={{
          background: "linear-gradient(to top, #00008B , transparent)", // Gradient màu xanh
          borderRadius: "15px 0 0 0", // Bo góc phía trên bên trái
          // width: "30%",
          // height: "auto",
        }}
      >
       <h1
          className="text-[30px] md:text-[40px] font-bold leading-tight max-w-[300px] md:max-w-[800px] text-white mb-5"
        >
          Find special prices to favorite destinations
        </h1>
        <button className="bg-white text-black mt-3 px-8 py-3 rounded-xl hover:bg-gray-300 transition duration-200 md:mt-5 text-[#00008B]">
          Book now
        </button> 
      </div>
    
    </div>
  );
};

export default LetGetToKnow;
