import type { Dispatch, SetStateAction } from 'react';

// * utils
import { cn } from '@/utils';

// * components
import Button from '../ui/Button';

// * icons
import { Table2, SplitSquareHorizontal } from 'lucide-react';

// * types
export type View = 'editor' | 'preview' | 'split';

type ViewToggleProps = {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
};

const ViewToggle = ({ view, setView }: ViewToggleProps) => {
  const viewToggleHandler = (newView: View) => setView(newView);

  return (
    <div className='view-toggle flex'>
      <Button
        variant='secondary'
        onClick={viewToggleHandler.bind(null, 'editor')}
        className={cn('rounded-r-none', view === 'editor' && 'bg-primary-dark')}
        data-tooltip-id='tooltip'
        data-tooltip-content='editor view'
      >
        <Table2 size={22} className='shrink-0' />
      </Button>

      <Button
        variant='secondary'
        onClick={viewToggleHandler.bind(null, 'split')}
        className={cn('rounded-none border-x-0', view === 'split' && 'bg-primary-dark')}
        data-tooltip-id='tooltip'
        data-tooltip-content='split view'
      >
        <SplitSquareHorizontal size={22} className='shrink-0' />
      </Button>

      <Button
        variant='secondary'
        onClick={viewToggleHandler.bind(null, 'preview')}
        className={cn('rounded-l-none', view === 'preview' && 'bg-primary-dark')}
        data-tooltip-id='tooltip'
        data-tooltip-content='markdown view'
      >
        <span className='w-[22px] text-[14px] font-medium shrink-0'>MD</span>
      </Button>
    </div>
  );
};

export default ViewToggle;
