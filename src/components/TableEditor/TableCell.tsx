import { useRef, forwardRef, type Dispatch, type SetStateAction } from 'react';

// * dompurify
import DOMPurify from 'isomorphic-dompurify';

// * utils
import { moveCursorToEnd } from '@/utils';

// * types
type TableCellProps = {
  value: string;
  cell: [number, number];
  setVector: Dispatch<SetStateAction<string[][]>>;
};

const TableCell = forwardRef<HTMLDivElement, TableCellProps>(
  ({ cell, value, setVector }, ref) => {
    const defaultValue = useRef<string>(value);
    const [row, col] = cell;

    const focusHandler = (e: React.FocusEvent<HTMLDivElement>) => moveCursorToEnd(e.currentTarget);

    const inputHandler = (e: React.FormEvent<HTMLDivElement>) => {
      const newValue = e.currentTarget.textContent ?? '';
      const sanitizedValue = DOMPurify.sanitize(newValue);

      setVector(prev => {
        const newVector = prev.slice();
        newVector[row][col] = sanitizedValue;
        return newVector;
      });
    };

    return (
      <div
        ref={ref}
        data-col={col}
        data-row={row}
        contentEditable
        onInput={inputHandler}
        onFocus={focusHandler}
        suppressContentEditableWarning
        className='table-cell min-w-full w-fit focus:outline focus:outline-info whitespace-nowrap py-3 px-6'
      >
        {defaultValue.current}
      </div>
    );
  }
);

TableCell.displayName = 'TableCell';

export default TableCell;
