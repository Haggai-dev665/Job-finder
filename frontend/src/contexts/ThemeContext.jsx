import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isOlive, setIsOlive] = useState(false);

  // Apply or remove olive-theme class on <body>
  useEffect(() => {
    document.body.classList.toggle('olive-theme', isOlive);
  }, [isOlive]);

  const toggleTheme = () => setIsOlive(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isOlive, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
