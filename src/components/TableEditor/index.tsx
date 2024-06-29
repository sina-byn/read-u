import { useState, useEffect, createRef } from 'react';

// * utils
import { cn, moveCursorToEnd } from '@/utils';
import { vectorToMarkdown } from '@/utils/vector';

// * components
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import CellInput from './CellInput';
import ViewToggle from './ViewToggle';
import CopyButton from '../ui/CopyButton';

// * icons
import { X, Plus, Table2 } from 'lucide-react';

// * data
const DEFAULT_VECTOR: Vector = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// * types
import type { View } from './ViewToggle';

export type Vector = string[][];

type InputVector = React.RefObject<HTMLInputElement>[][];

const TableEditor = () => {
  const [view, setView] = useState<View>('split');
  const [open, setOpen] = useState<boolean>(true);

  const [vector, setVector] = useState<Vector>(DEFAULT_VECTOR);
  const vectorMarkdown = vectorToMarkdown(vector);
  const colCount = vector[0].length;
  const rowCount = vector.length;

  const inputVector: InputVector = Array.from({ length: rowCount }, () =>
    Array.from({ length: colCount }, () => createRef<HTMLInputElement>())
  );

  const openHandler = () => setOpen(true);

  const insertRow = () => setVector(prev => [...prev, Array(colCount).fill('')]);

  const insertCol = () => {
    setVector(prev => {
      const newVector = prev.map(row => [...row, '']);
      return newVector;
    });
  };

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (!['Delete', 'Backspace'].includes(e.key)) return;

      const activeElement = document.activeElement;
      if (!activeElement || !activeElement.className.startsWith('cell-input')) return;

      const activeInput = activeElement as HTMLDivElement;
      if (!e.shiftKey && activeInput.textContent?.length !== 0) return;

      const currentCol = +activeInput.dataset.col!;
      const currnetRow = +activeInput.dataset.row!;
      let newCol = currentCol - 1;
      let newRow = currnetRow;

      if (newCol < 0) {
        [newRow, newCol] = [newRow - 1, colCount - 1];
        if (newRow === -1) [newRow, newCol] = [0, 0];
      }

      if (newRow === currnetRow && newCol === currentCol) return;

      e.preventDefault();
      const prevInput = inputVector[newRow][newCol].current!;
      prevInput.focus();
      moveCursorToEnd(prevInput);
    };

    window.addEventListener('keydown', keyDownHandler);

    return () => window.removeEventListener('keydown', keyDownHandler);
  }, [inputVector]);

  return (
    <>
      <Button variant='secondary' onClick={openHandler}>
        <Table2 className='shrink-0' />
        Table Editor
      </Button>

      <Modal open={open} setOpen={setOpen} className='i-modal'>
        {closeHandler => (
          <article className='grid grid-rows-[3rem,_4rem,_1fr] size-full bg-primary border border-neutral rounded-md'>
            <header className='flex items-center justify-between gap-x-6 h-12 border-b border-neutral px-8'>
              <span className='capitalize'>Table Editor</span>
              <button type='button' onClick={closeHandler}>
                <X />
              </button>
            </header>

            <header className='editor-toolbar flex justify-between items-center border-b border-neutral px-8'>
              <div className='left flex items-center gap-x-6'></div>
              <div className='right flex items-center gap-x-6'>
                <ViewToggle view={view} setView={setView} />
                <CopyButton text={vectorMarkdown} />
              </div>
            </header>

            <div
              className={cn('table-editor grid overflow-hidden', view === 'split' && 'grid-cols-2')}
            >
              <div
                className={cn(
                  'editor-wrapper relataive size-full overflow-hidden',
                  view === 'preview' && 'hidden'
                )}
              >
                <div className='editor size-full relative !overflow-hidden'>
                  <div className='table-wrapper size-[calc(100%_-_64px)] overflow-auto'>
                    <table className=''>
                      <thead>
                        <tr>
                          {vector[0]?.map((_, index) => (
                            <th key={index} className='font-light border border-t-0 border-neutral'>
                              <CellInput
                                cell={[0, index]}
                                setVector={setVector}
                                value={vector[0][index]}
                                ref={inputVector[0][index]}
                              />
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {vector.length > 1 &&
                          vector.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.length > 0 &&
                                row.map((_, colIndex) => (
                                  <td key={colIndex} className='font-light border border-neutral'>
                                    <CellInput
                                      setVector={setVector}
                                      cell={[rowIndex + 1, colIndex]}
                                      value={vector[rowIndex + 1][colIndex]}
                                      ref={inputVector[rowIndex + 1][colIndex]}
                                    />
                                  </td>
                                ))}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <div className='side flex items-center justify-center absolute right-0 inset-y-0 z-10 w-16 bg-inherit'>
                    <Button
                      base={false}
                      variant='info'
                      onClick={insertCol}
                      className='flex justify-center items-center w-8 h-24 bg-info opacity-30 hover:opacity-100 rounded-md -mt-16'
                    >
                      <Plus size={18} />
                    </Button>
                  </div>

                  <div className='bottom flex items-center justify-center absolute bottom-0 inset-x-0 z-10 h-16 bg-inherit'>
                    <Button
                      base={false}
                      variant='info'
                      onClick={insertRow}
                      className='flex justify-center items-center w-24 h-8 bg-info opacity-30 hover:opacity-100 rounded-md -ml-16'
                    >
                      <Plus size={18} />
                    </Button>
                  </div>
                </div>
              </div>

              <code
                className={cn(
                  'markdown-preview border-l border-neutral whitespace-pre overflow-auto p-8',
                  view === 'editor' && 'hidden'
                )}
              >
                {vectorMarkdown}
              </code>
            </div>
          </article>
        )}
      </Modal>
    </>
  );
};

export default TableEditor;
