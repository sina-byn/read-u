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
  colCount: number;
  rowCount: number;
  appendCol: () => void;
  appendRow: () => void;
  deleteCol: (colIndex: number) => void;
  deleteRow: (rowIndex: number) => void;
  forced: number;
  forceUpdate: Function;
};

const TableEditorContextProvider = ({ children }: ProviderProps) => {
  const [vector, _setVector] = useState<Vector>(DEFAULT_VECTOR);
  const [view, setView] = useState<View>('split');
  const [forced, forceUpdate] = useForcedUpdate();
  const colCount = vector[0].length;
  const rowCount = vector.length;

  const setVector = useCallback((v: SetVector) => {
    _setVector(prev => {
      const newVector = typeof v === 'function' ? v(prev) : v;
      localStorage.setItem('__markdown_table__', JSON.stringify(newVector));

      return newVector;
    });
  }, []);

  const appendRow = () => {
    setVector(prev => {
      const colCount = prev[0].length;
      return [...prev, Array(colCount).fill('')];
    });
  };

  const appendCol = () => {
    setVector(prev => {
      const newVector = prev.map(row => [...row, '']);
      return newVector;
    });
  };

  const deleteCol = (colIndex: number) => {
    setVector(prev => {
      if (colCount === 1) return prev;

      const newVector = prev.map(row => {
        const newRow = row.slice();
        newRow.splice(colIndex, 1);

        return newRow;
      });

      return newVector;
    });

    forceUpdate();
  };

  const deleteRow = (rowIndex: number) => {
    setVector(prev => {
      if (rowCount === 1) return prev;

      const newVector = prev.slice();
      newVector.splice(rowIndex, 1);
      return newVector;
    });

    forceUpdate();
  };

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

      if (!el.classList.contains('table-cell')) return;
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

  const context = {
    view,
    setView,
    vector,
    setVector,
    colCount,
    rowCount,
    appendCol,
    appendRow,
    deleteCol,
    deleteRow,
    forced,
    forceUpdate,
  };

  return <tableEditorContext.Provider value={context}>{children}</tableEditorContext.Provider>;
};

export const useTableEditorContext = () => useContext(tableEditorContext)!;

export default TableEditorContextProvider;
