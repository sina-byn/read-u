'use client';

import { useState, useEffect } from 'react';

// * components
import Modal from './ui/Modal';
import Button from './ui/Button';
import Checkbox from './ui/Checkbox';

// * icons
import { X, Info, PictureInPicture } from 'lucide-react';

// * data
const STORAGE_KEY = '__show_guide__';

const TabSyncGuide = () => {
  const [open, setOpen] = useState<boolean>(false);

  const closeHandler = setOpen.bind(null, false);

  const showAgainDisableHandler = (disabled: boolean) => {
    disabled ? localStorage.setItem(STORAGE_KEY, 'n') : localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    const storedShowAgain = localStorage.getItem(STORAGE_KEY);
    setOpen(storedShowAgain !== 'n');
  }, []);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className='flex justify-center items-center max-h-[calc(100svh_-_32px)] w-full max-w-[410px] overflow-hidden'
    >
      <article className='w-full h-fit bg-primary border border-neutral rounded-md overflow-hidden'>
        <header className='flex items-center justify-between gap-x-2 h-12 border-b border-neutral px-3'>
          <div className='flex items-center gap-x-2'>
            <span className='capitalize'>tab synchronization guide</span>
          </div>

          <button type='button' onClick={closeHandler}>
            <X />
          </button>
        </header>

        <div className='content max-h-[calc(100svh_-_5rem_-_2px)] overflow-y-auto'>
          <div className='flex flex-col gap-y-3 p-3'>
            <div>
              <div className='flex gap-x-2 w-fit bg-info/30 rounded-md p-2'>
                <Info size={18} className='shrink-0 text-info' />
                <p className='text-sm -mt-0.5'>This app fully supports tab synchronization.</p>
              </div>
            </div>

            <p>
              Open this web app in another tab and start typing in either of the open tabs. You will
              see that full tab synchronization is supported. Note that the table editor also
              supports this feature.
            </p>

            <div className='flex flex-col'>
              To further enhance your experience, make sure to use
              <div className='flex items-center justify-center w-fit h-10 bg-primary-light border border-neutral rounded-md scale-75 px-3 -ml-1.5'>
                <PictureInPicture size={22} className='shrink-0 -scale-y-100' />
              </div>
            </div>

            <div className='grow grid md:grid-cols-2 gap-3'>
              {/* eslint-disable-next-line */}
              <img alt='tab sync guide' src='/images/editor-sync.gif' className='w-full' />
              {/* eslint-disable-next-line */}
              <img alt='tab sync guide' src='/images/preview-sync.gif' className='w-full' />
            </div>

            <footer>
              <Checkbox onChange={showAgainDisableHandler}>Don't show again</Checkbox>

              <Button variant='secondary' onClick={closeHandler} className='text-sm h-9 px-5 mt-2'>
                Ok
              </Button>
            </footer>
          </div>
        </div>
      </article>
    </Modal>
  );
};

export default TabSyncGuide;
