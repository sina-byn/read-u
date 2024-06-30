import { useState } from 'react';

// * components
import Modal from './ui/Modal';
import Button from './ui/Button';

// * icons
import { X, Expand } from 'lucide-react';

// * types
type ExpandButtonProps = { title?: string; children: JSX.Element };

const ExpandButton = ({ title, children }: ExpandButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleHandler = () => setOpen(prev => !prev);

  return (
    <Button
      variant='secondary'
      onClick={toggleHandler}
      className='hover:bg-primary border-b-0 border-l-0 rounded-b-none rounded-l-none'
    >
      <Modal open={open} setOpen={setOpen} className='i-modal'>
        {closeHandler => (
          <article className='grid grid-rows-[3rem,_1fr] size-full bg-primary border border-neutral rounded-md'>
            <header className='flex items-center justify-between gap-x-6 h-12 border-b border-neutral px-3'>
              <span className='capitalize'>{title}</span>
              <button type='button' onClick={closeHandler}>
                <X />
              </button>
            </header>
            <div className='expanded overflow-y-auto'>{children}</div>
          </article>
        )}
      </Modal>
      <Expand size={22} />
    </Button>
  );
};

export default ExpandButton;
