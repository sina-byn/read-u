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
  markdown: string;
  setMarkdown: Dispatch<SetStateAction<string>>;
};

const AppContextProvider = ({ children }: ProviderProps) => {
  const [view, setView] = useState<View>('split');
  const [theme, setTheme] = useState<Theme>('dark');
  const [markdown, setMarkdown] = useState<string>('');

  const context = { view, setView, theme, setTheme, markdown, setMarkdown };

  useEffect(() => {
    const storedMarkdown = localStorage.getItem('__readme_md__');
    const storedTheme = localStorage.getItem('__gfm_theme__') as Theme;
    const storedView = localStorage.getItem('__markdown_editor_view__') as View;

    setMarkdown(storedMarkdown ?? '');
    if (storedTheme && themes.includes(storedTheme)) setTheme(storedTheme);
    if (storedView && ['tabs', 'split'].includes(storedView)) setView(storedView);
  }, []);

  return <appContext.Provider value={context}>{children}</appContext.Provider>;
};

export const useAppContext = () => useContext(appContext)!;

export default AppContextProvider;
