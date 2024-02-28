import React, { createContext, useState, useContext } from "react";
import './DetailsBlog.css'

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState("Hello from DataContext!");
  const [additionalData, setAdditionalData] = useState(null);

  const updateAdditionalData = (newData) => {
    setAdditionalData(newData);
  };

  return (
    <DataContext.Provider value={{ data, additionalData, updateAdditionalData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
