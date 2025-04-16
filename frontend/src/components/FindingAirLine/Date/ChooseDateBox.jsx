import React from "react";
function ChooseDateBox({title, name, value, handleFormDataChange}){

    return (
        
            <div className="h-[50%]">
              <h1>{title}</h1>
              <input
                name={name}
                type="date"
                value={value}
                className="outline-none text-[20px] w-full text-gray-400"
                onChange={handleFormDataChange}
              />
            </div>
          
    );
}
export default ChooseDateBox;