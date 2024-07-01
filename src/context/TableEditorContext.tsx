import {
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
  type Dispatch,
  type SetStateAction,
} from 'react';

// * context
const tableEditorContext = createContext<TableEditorContext | null>(null);

// * data
export const DEFAULT_VECTOR: Vector = [
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
};

const TableEditorContextProvider = ({ children }: ProviderProps) => {
  const [vector, _setVector] = useState<Vector>(DEFAULT_VECTOR);
  const [view, setView] = useState<View>('split');

  const setVector = useCallback((v: SetVector) => {
    _setVector(prev => {
      const newVector = typeof v === 'function' ? v(prev) : v;
      localStorage.setItem('__markdown_table__', JSON.stringify(newVector));

      return newVector;
    });
  }, []);

  const context = { view, setView, vector, setVector };

  return <tableEditorContext.Provider value={context}>{children}</tableEditorContext.Provider>;
};

export const useTableEditorContext = () => useContext(tableEditorContext)!;

export default TableEditorContextProvider;
