import React, { createContext, useContext, useState, useEffect } from "react";
import "./BackgroundContext.css";

const BackgroundContext = createContext();

export function BackgroundProvider({ children }) {
  const savedBackground = localStorage.getItem("background") || "space"; 
  const [background, setBackground] = useState(savedBackground); 

  useEffect(() => {
    localStorage.setItem("background", background);
  }, [background]);

  const changeBackground = (type) => {
    setBackground(type);
  };

  return (
    <BackgroundContext.Provider value={{ background, changeBackground }}>
      <div className={`background ${background}`}>{children}</div>
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  return useContext(BackgroundContext);
}
