import React from "react";

const HeroSectionCard = (props) => {
  return (
    <div className="cursor-pointer">
      <img
        src={props.src}
        alt="..."
        className="w-full h-full object-cover absolute"
      />
      

      {/* Phần màu xanh */}
      <div
        className="absolute bottom-0 right-0 w-full bg-gradient-to-t from-blue-500 to-blue-700 p-8 md:p-10 text-white flex flex-col items-center space-y-3"
        style={{
          background: "linear-gradient(to top, #00008B , transparent)", // Gradient màu xanh
          borderRadius: "15px 0 0 0", // Bo góc phía trên bên trái
          // width: "30%",
          // height: "auto",
        }}
      >
       <h1 className="text-[30px] md:text-[40px] font-bold leading-tight max-w-[300px] md:max-w-[800px] text-white">
          {props.heading}
        </h1>
        <p className="text-white mt-2 md:mt-2 text-[14px] md:text-lg font-light">
          {props.subheading}
        </p>
        <button className="bg-white text-black mt-3 px-8 py-3 rounded-xl hover:bg-gray-300 transition duration-200 md:mt-5 text-[#00008B]">
          Book now
        </button> 
      </div>

      <div className="absolute bottom-[50px] md:top-[100px] left-[20px] md:left-[50px]">
        
      </div>
    </div>
  );
};

export default HeroSectionCard;
