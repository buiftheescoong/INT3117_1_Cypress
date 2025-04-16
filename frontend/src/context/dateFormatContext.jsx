import React, { createContext } from 'react';

const DateFormatContext = createContext();

const DateFormatProvider = ({ children }) => {
    const formatedFunction = { 
        formatedDate : (date) => {
            return date.split('-').reverse().join('-');
        }
     };
  
    return (
      <DateFormatContext.Provider value={formatedFunction}>
        {children}
      </DateFormatContext.Provider>
    );
  };
  
  export {DateFormatProvider, DateFormatContext};