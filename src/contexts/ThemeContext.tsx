import React, { createContext, useState, useEffect, useContext } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Load theme from localStorage or default to dark
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('gta-theme');
    return (savedTheme as Theme) || 'dark';
  });

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('gta-theme', theme);
    
    // Update CSS variables based on theme
    if (theme === 'light') {
      document.documentElement.style.setProperty('--color-background', '#f0f0f0');
      document.documentElement.style.setProperty('--color-card', '#ffffff');
      document.documentElement.style.setProperty('--color-text', '#0a0a0a');
    } else {
      document.documentElement.style.setProperty('--color-background', '#0a0a0a');
      document.documentElement.style.setProperty('--color-card', '#111111');
      document.documentElement.style.setProperty('--color-text', '#ffffff');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};