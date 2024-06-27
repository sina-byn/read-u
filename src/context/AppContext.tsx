'use client';

import { useState, useContext, createContext, type Dispatch, type SetStateAction } from 'react';

// * context
const appContext = createContext<AppContext | null>(null);

// * types
import type { Theme } from '@/components/Toolbar';

type View = 'tabs' | 'split';

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

  return <appContext.Provider value={context}>{children}</appContext.Provider>;
};

export const useAppContext = () => useContext(appContext)!;

export default AppContextProvider;
