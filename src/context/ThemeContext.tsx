import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'yellow';

export interface ThemeClasses {
  bg: string;
  card: string;
  cardHeader: string;
  cardAccent: string;
  input: string;
  buttonPrimary: string;
  buttonSecondary: string;
  textMuted: string;
  textHeading: string;
  navBg: string;
  badge: string;
  border: string;
}

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  classes: ThemeClasses;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const getThemeClasses = (mode: ThemeMode): ThemeClasses => {
  switch (mode) {
    case 'light':
      return {
        bg: 'bg-slate-50 text-slate-900',
        card: 'bg-white border border-slate-200/90 shadow-lg text-slate-800',
        cardHeader: 'bg-slate-100/80 border-b border-slate-200 text-slate-900',
        cardAccent: 'bg-amber-50 border border-amber-200 text-amber-900',
        input: 'bg-white border-slate-300 text-slate-900 focus:border-amber-500 focus:ring-amber-400 placeholder-slate-400',
        buttonPrimary: 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md hover:shadow-lg transition-all',
        buttonSecondary: 'bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold',
        textMuted: 'text-slate-500',
        textHeading: 'text-slate-900',
        navBg: 'bg-[#001d4a] text-white border-b border-amber-500/30',
        badge: 'bg-amber-100 text-amber-900 border border-amber-300/80',
        border: 'border-slate-200',
      };
    case 'dark':
      return {
        bg: 'bg-[#000d21] text-slate-100',
        card: 'bg-[#00173b] border border-amber-500/20 shadow-xl text-slate-100',
        cardHeader: 'bg-[#00122e] border-b border-amber-500/20 text-white',
        cardAccent: 'bg-[#002254] border border-amber-500/30 text-amber-200',
        input: 'bg-[#000f28] border-amber-500/30 text-white focus:border-amber-400 focus:ring-amber-500/50 placeholder-slate-500',
        buttonPrimary: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-blue-950 font-bold shadow-lg',
        buttonSecondary: 'bg-blue-900/60 hover:bg-blue-900 text-amber-200 border border-amber-500/30 font-semibold',
        textMuted: 'text-slate-400',
        textHeading: 'text-white',
        navBg: 'bg-[#00173b] text-white border-b border-amber-500/30',
        badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
        border: 'border-amber-500/20',
      };
    case 'yellow':
      return {
        bg: 'bg-[#ffd700] text-black',
        card: 'bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black',
        cardHeader: 'bg-[#ffd700] border-b-3 border-black text-black font-extrabold',
        cardAccent: 'bg-amber-200 border-2 border-black text-black font-bold',
        input: 'bg-white border-2 border-black text-black focus:ring-2 focus:ring-black placeholder-gray-500 font-medium',
        buttonPrimary: 'bg-[#001d4a] hover:bg-[#002d72] text-amber-300 font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]',
        buttonSecondary: 'bg-yellow-300 hover:bg-yellow-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
        textMuted: 'text-gray-700 font-medium',
        textHeading: 'text-black font-black',
        navBg: 'bg-[#001d4a] text-white border-b-4 border-black',
        badge: 'bg-yellow-300 text-black border-2 border-black font-extrabold',
        border: 'border-black',
      };
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('cheapo_air_theme');
    return (saved as ThemeMode) || 'light';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('cheapo_air_theme', newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('yellow');
    else setTheme('light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const classes = getThemeClasses(theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, classes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
