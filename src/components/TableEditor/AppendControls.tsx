// * hooks
import { useTableEditorContext } from '@/context/TableEditorContext';

// * components
import Button from '../ui/Button';

// * icons
import { Plus } from 'lucide-react';

const AppendControls = () => {
  const { appendCol, appendRow } = useTableEditorContext();

  return (
    <>
      <div className='side flex items-center justify-center absolute right-0 inset-y-0 z-10 w-16 bg-inherit'>
        <Button
          base={false}
          variant='success'
          onClick={appendCol}
          className='flex justify-center items-center w-8 h-24 bg-info opacity-30 hover:opacity-100 rounded-md -mt-16'
        >
          <Plus size={18} />
        </Button>
      </div>

      <div className='bottom flex items-center justify-center absolute bottom-0 inset-x-0 z-10 h-16 bg-inherit'>
        <Button
          base={false}
          variant='success'
          onClick={appendRow}
          className='flex justify-center items-center w-24 h-8 bg-info opacity-30 hover:opacity-100 rounded-md -ml-16'
        >
          <Plus size={18} />
        </Button>
      </div>
    </>
  );
};

export default AppendControls;
