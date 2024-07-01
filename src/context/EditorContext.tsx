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
const editorContext = createContext<EditorContext | null>(null);

// * data
import { themes, type Theme } from '@/components/Toolbar';

// * types
export type View = 'tabs' | 'split';

type ProviderProps = { children: React.ReactNode };

type EditorContext = {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  markdown: string;
  setMarkdown: Dispatch<SetStateAction<string>>;
};

const EditorContextProvider = ({ children }: ProviderProps) => {
  const [view, setView] = useState<View>('split');
  const [theme, setTheme] = useState<Theme>('dark');
  const [markdown, setMarkdown] = useState<string>('');

  const context = { view, setView, theme, setTheme, markdown, setMarkdown };

  useEffect(() => {
    const storedMarkdown = localStorage.getItem('__markdown__');
    const storedTheme = localStorage.getItem('__gfm_theme__') as Theme;
    const storedView = localStorage.getItem('__markdown_editor_view__') as View;

    if (storedMarkdown) setMarkdown(storedMarkdown);
    if (storedTheme && themes.includes(storedTheme)) setTheme(storedTheme);
    if (storedView && ['tabs', 'split'].includes(storedView)) setView(storedView);

    const storageSyncHandler = (e: StorageEvent) => {
      if (e.storageArea !== localStorage || e.key !== '__markdown__') return;
      setMarkdown(e.newValue ?? '');
    };

    window.addEventListener('storage', storageSyncHandler);

    return () => window.removeEventListener('storage', storageSyncHandler);
  }, []);

  return <editorContext.Provider value={context}>{children}</editorContext.Provider>;
};

export const useEditorContext = () => useContext(editorContext)!;

export default EditorContextProvider;
