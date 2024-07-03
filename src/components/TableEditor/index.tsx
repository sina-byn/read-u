import Link from 'next/link';
import { useState, useEffect, createRef } from 'react';
import { useSearchParams } from 'next/navigation';

// * utils
import { cn, moveCursorToEnd } from '@/utils';
import { vectorToMarkdown } from '@/utils/vector';

// * hooks
import { useTableEditorContext } from '@/context/TableEditorContext';

// * components
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import TableCell from './TableCell';
import ViewToggle from './ViewToggle';
import PasteButton from './PasteButton';
import CopyButton from '../ui/CopyButton';
import AppendControls from './AppendControls';
import ConfirmationModal from './ConfirmationModal';

// * icons
import { X, Table2, PictureInPicture } from 'lucide-react';

// * types
type InputVector = React.RefObject<HTMLDivElement>[][];

const TableEditor = () => {
  const params = useSearchParams();

  // prettier-ignore
  const { view, setView, vector, setVector, colCount, rowCount, deleteCol, deleteRow, forced } = useTableEditorContext();
  const [open, setOpen] = useState<boolean>(params.get('table_editor') === 'true' ? true : false);

  const vectorMarkdown = vectorToMarkdown(vector);

  const inputVector: InputVector = Array.from({ length: rowCount }, () =>
    Array.from({ length: colCount }, () => createRef<HTMLDivElement>())
  );

  const openHandler = () => setOpen(true);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.altKey) {
        const key = e.key.toLowerCase();

        if (e.shiftKey) {
          if (!document.activeElement?.classList.contains('table-cell')) return;
          const activeInput = document.activeElement as HTMLElement;

          switch (key) {
            case 'c':
              const colIndex = +activeInput.dataset.col!;
              deleteRow(colIndex);
              break;

            case 'r':
              const rowIndex = +activeInput.dataset.row!;
              deleteRow(rowIndex);
          }

          return;
        }

        switch (key) {
          case 'c':
            setVector(prev => {
              const newVector = prev.map(row => [...row, '']);
              return newVector;
            });
            break;

          case 'r':
            setVector(prev => {
              const colCount = prev[0].length;
              return [...prev, Array(colCount).fill('')];
            });
        }

        return;
      }

      if (!['Delete', 'Backspace'].includes(e.key)) return;

      const activeElement = document.activeElement;
      if (!activeElement || !activeElement.classList.contains('table-cell')) return;

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
            <header className='flex items-center justify-between gap-x-6 h-12 border-b border-neutral px-3'>
              <span className='capitalize'>Table Editor</span>
              <button type='button' onClick={closeHandler}>
                <X />
              </button>
            </header>

            <header className='editor-toolbar flex justify-between items-center border-b border-neutral px-3'>
              <div className='left flex items-center gap-x-6'>
                <ViewToggle view={view} setView={setView} />

                <Button className='new-tab-button p-0' variant='secondary'>
                  <Link
                    target='_blank'
                    href='?table_editor=true'
                    className='h-full flex items-center justify-center px-3'
                    data-tooltip-id='tooltip'
                    data-tooltip-content='open in new tab'
                  >
                    <PictureInPicture size={22} className='shrink-0 -scale-y-100' />
                  </Link>
                </Button>
              </div>

              <div className='right flex items-center gap-x-6'>
                <ConfirmationModal />

                <PasteButton />

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
                              <TableCell
                                key={forced}
                                cell={[0, index]}
                                setVector={setVector}
                                value={vector[0][index]}
                                ref={inputVector[0][index]}
                              />
                            </th>
                          ))}

                          {rowCount > 1 && (
                            <th className='row-delete-button size-12'>
                              <Button
                                onClick={deleteRow.bind(null, 0)}
                                className='flex items-center justify-center size-full bg-red-600/60 hover:bg-red-600 p-3'
                              >
                                <X size={16} />
                              </Button>
                            </th>
                          )}
                        </tr>
                      </thead>

                      <tbody>
                        {vector.length > 1 &&
                          vector.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.length > 0 &&
                                row.map((_, colIndex) => (
                                  <td key={colIndex} className='font-light border border-neutral'>
                                    <TableCell
                                      key={forced}
                                      setVector={setVector}
                                      cell={[rowIndex + 1, colIndex]}
                                      value={vector[rowIndex + 1][colIndex]}
                                      ref={inputVector[rowIndex + 1][colIndex]}
                                    />
                                  </td>
                                ))}

                              <td className='row-delete-button size-12'>
                                <Button
                                  onClick={deleteRow.bind(null, rowIndex + 1)}
                                  className='flex items-center justify-center size-full bg-red-600/60 hover:bg-red-600 p-3'
                                >
                                  <X size={16} />
                                </Button>
                              </td>
                            </tr>
                          ))}

                        {colCount > 1 && (
                          <tr>
                            {vector[0].map((_, index) => (
                              <td key={index} data-col={index}>
                                <Button
                                  onClick={deleteCol.bind(null, index)}
                                  className='col-delete-button flex items-center justify-center w-full h-12 bg-red-600/60 hover:bg-red-600 p-3'
                                >
                                  <X size={16} />
                                </Button>
                              </td>
                            ))}
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <AppendControls />
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
