import {
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
  type Dispatch,
  type SetStateAction,
} from 'react';

// * utils
import { markdownToVector } from '@/utils/vector';

// * context
const tableEditorContext = createContext<TableEditorContext | null>(null);

// * hooks
import useForcedUpdate from '@/hooks/useForcedUpdate';

// * data
const DEFAULT_VECTOR: Vector = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// * types
export type View = 'editor' | 'preview' | 'split';

export type Vector = string[][];

type SetVector = Vector | ((oldVector: Vector) => Vector);

type ProviderProps = { children: React.ReactNode };

type TableEditorContext = {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
  vector: Vector;
  setVector: (v: SetVector) => void;
  forced: number;
  forceUpdate: Function;
};

const TableEditorContextProvider = ({ children }: ProviderProps) => {
  const [vector, _setVector] = useState<Vector>(DEFAULT_VECTOR);
  const [view, setView] = useState<View>('split');
  const [forced, forceUpdate] = useForcedUpdate();

  const setVector = useCallback((v: SetVector) => {
    _setVector(prev => {
      const newVector = typeof v === 'function' ? v(prev) : v;
      localStorage.setItem('__markdown_table__', JSON.stringify(newVector));

      return newVector;
    });
  }, []);

  useEffect(() => {
    const initVector = () => {
      try {
        const parsedVector: Vector = JSON.parse(localStorage.getItem('__markdown_table__') ?? '');
        setVector(parsedVector || DEFAULT_VECTOR);
      } catch (err) {
        console.error(err);
      }
    };

    const storageSyncHandler = (e: StorageEvent) => {
      if (e.storageArea !== localStorage || e.key !== '__markdown_table__') return;
      forceUpdate();

      initVector();
    };

    const keyPressHandler = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;

      if (!el.classList.contains('cell-input')) return;
      e.key === 'Enter' && e.preventDefault();
    };

    const pasteHandler = (e: ClipboardEvent) => {
      const pastedItem = e.clipboardData?.items[0];
      if (!pastedItem) return;

      pastedItem.getAsString((pastedText: string) => {
        const vector = markdownToVector(pastedText ?? '');
        if (!vector) return;

        forceUpdate();
        setVector(vector);
      });
    };

    initVector();
    window.addEventListener('storage', storageSyncHandler);
    window.addEventListener('keypress', keyPressHandler);
    window.addEventListener('paste', pasteHandler);

    return () => {
      window.removeEventListener('storage', storageSyncHandler);
      window.removeEventListener('keypress', keyPressHandler);
      window.removeEventListener('paste', pasteHandler);
    };
  }, []);

  const context = { view, setView, vector, setVector, forced, forceUpdate };

  return <tableEditorContext.Provider value={context}>{children}</tableEditorContext.Provider>;
};

export const useTableEditorContext = () => useContext(tableEditorContext)!;

export default TableEditorContextProvider;
