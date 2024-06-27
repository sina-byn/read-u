'use client';

import {
  useState,
  useEffect,
  useContext,
  createContext,
  type Dispatch,
  type SetStateAction,
} from 'react';

// * context
const appContext = createContext<AppContext | null>(null);

// * data
import { themes, type Theme } from '@/components/Toolbar';

// * types
export type View = 'tabs' | 'split';

type ProviderProps = { children: React.ReactNode };

type AppContext = {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

const AppContextProvider = ({ children }: ProviderProps) => {
  const [view, setView] = useState<View>('split');
  const [theme, setTheme] = useState<Theme>('light');

  const context = { view, setView, theme, setTheme };

  useEffect(() => {
    const storedTheme = localStorage.getItem('__gfm_theme__') as Theme;

    if (!storedTheme || !themes.includes(storedTheme)) return;
    setTheme(storedTheme);
  }, []);

  return <appContext.Provider value={context}>{children}</appContext.Provider>;
};

export const useAppContext = () => useContext(appContext)!;

export default AppContextProvider;
