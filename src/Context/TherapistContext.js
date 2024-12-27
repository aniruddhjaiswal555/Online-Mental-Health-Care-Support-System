import React, { createContext, useContext, useState, useEffect } from 'react';
const TherapistContext = createContext();
export const useTherapist = () => useContext(TherapistContext);
export const TherapistProvider = ({ children }) => {
  const [therapistEmail, setTherapistEmail] = useState(() => {
    return localStorage.getItem('therapistEmail') || '';
  });
  useEffect(() => {
    if (therapistEmail) {
      localStorage.setItem('therapistEmail', therapistEmail);
    }
  }, [therapistEmail]);
  const setEmail = (email) => {
    setTherapistEmail(email);
  };
  const clearEmail = () => {
    setTherapistEmail('');
    localStorage.removeItem('therapistEmail');
  };
  return (
    <TherapistContext.Provider value={{ therapistEmail, setEmail, clearEmail }}>
      {children}
    </TherapistContext.Provider>
  );
};
