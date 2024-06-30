import { useState } from 'react';

// * components
import Modal from '../ui/Modal';
import Button from '../ui/Button';

// * icons
import { Trash } from 'lucide-react';

// * types
type ResetModalProps = { reset: Function };

const ResetModal = ({ reset }: ResetModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant='secondary' className='capitalize' onClick={setOpen.bind(null, true)}>
        <Trash size={22} className='shrink-0' />
        reset
      </Button>

      <Modal
        open={open}
        setOpen={setOpen}
        backdropCloseable={false}
        backdropClassName='bg-black/60'
        className='max-w-72 bg-primary border border-neutral rounded-md p-4'
      >
        {closeHandler => {
          const resetHandler = () => {
            reset();
            closeHandler();
          };

          return (
            <>
              <div className='text-xl text-center'>Are you sure you want to reset the table?</div>

              <div className='controls flex gap-x-3 mt-6'>
                <Button variant='secondary' onClick={closeHandler} className='flex-1'>
                  No
                </Button>
                <Button onClick={resetHandler} className='flex-1'>
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

export default ResetModal;
