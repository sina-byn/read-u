'use client';

import { useState, useContext, createContext, type Dispatch, type SetStateAction } from 'react';

// * context
const appContext = createContext<AppContext | null>(null);

// * types
type View = 'tabs' | 'split';

type ProviderProps = { children: React.ReactNode };

type AppContext = {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
};

const AppContextProvider = ({ children }: ProviderProps) => {
  const [view, setView] = useState<View>('split');

  const context = { view, setView };

  return <appContext.Provider value={context}>{children}</appContext.Provider>;
};

export const useAppContext = () => useContext(appContext)!;

export default AppContextProvider;
