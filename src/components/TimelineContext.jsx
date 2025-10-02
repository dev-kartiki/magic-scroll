import { createContext, useContext, useState } from "react";

// Create context
const TimelineContext = createContext();

// Custom hook to use the context
export const useTimeline = () => useContext(TimelineContext);

// Provider
export const TimelineProvider = ({ children }) => {
  const [activeName, setActiveName] = useState(''); // default first Name active
  const [isWhiteBgActive, setIsWhiteBgActive] = useState(false); // ✅ new flag

  return (
    <TimelineContext.Provider value={{ activeName, setActiveName, isWhiteBgActive, setIsWhiteBgActive }}>
      {children}
    </TimelineContext.Provider>
  );
};
