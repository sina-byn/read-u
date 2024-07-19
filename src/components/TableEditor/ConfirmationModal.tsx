import { useState } from 'react';

// * hooks
import { useTableEditorContext } from '@/context/TableEditorContext';

// * components
import Modal from '../ui/Modal';
import Button from '../ui/Button';

// * icons
import { Trash } from 'lucide-react';

const ConfirmationModal = () => {
  const { setVector, forceUpdate } = useTableEditorContext();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant='secondary' className='capitalize' onClick={setOpen.bind(null, true)}>
        <Trash size={22} className='shrink-0' />
        <span className='hidden lg:inline'>reset</span>
      </Button>

      <Modal
        open={open}
        setOpen={setOpen}
        backdropCloseable={false}
        backdropClassName='bg-black/60'
        className='max-w-96 bg-primary border border-neutral rounded-md p-4'
      >
        {closeHandler => {
          const resetHandler = () => {
            setVector([
              ['', '', ''],
              ['', '', ''],
              ['', '', ''],
            ]);
            forceUpdate();
            closeHandler();
          };

          return (
            <>
              <div className='text-lg sm:text-xl text-center px-4'>
                Are you sure you want to reset the table?
              </div>

              <div className='controls flex flex-col-reverse gap-y-3 mt-4'>
                <Button
                  variant='secondary'
                  onClick={closeHandler}
                  className='flex-1 text-sm lg:text-base py-1.5'
                >
                  No
                </Button>
                <Button onClick={resetHandler} className='flex-1 text-sm lg:text-base py-1.5'>
                  Yes
                </Button>
              </div>
            </>
          );
        }}
      </Modal>
    </>
  );
};

export default ConfirmationModal;
