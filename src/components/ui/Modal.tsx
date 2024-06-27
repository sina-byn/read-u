import type { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

// * utils
import { cn } from '@/utils';

// * hooks
import useClient from '@/hooks/useClient';

// * types
type ModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  zIndex?: number;
  closeable?: boolean;
  className?: string;
  children: React.ReactNode | ((closeHandler: () => void) => React.ReactNode);
};

const Modal = ({
  open,
  setOpen,
  className,
  children,
  zIndex = 50,
  closeable = true,
}: ModalProps) => {
  const isClient = useClient();

  const closeHandler = () => closeable && setOpen(false);

  const clickHandler = (e: React.MouseEvent) => e.stopPropagation();

  const backdropClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeHandler();
  };

  return isClient && open
    ? createPortal(
        <div
          style={{ zIndex }}
          onClick={backdropClickHandler}
          className='modal-backdrop flex items-center justify-center fixed inset-0 bg-black/90'
        >
          <div className='i-container h-full flex items-center justify-center'>
            <div className={cn('modal-wrapper size-fit', className)} onClick={clickHandler}>
              {typeof children === 'function' ? children(closeHandler) : children}
            </div>
          </div>
        </div>,
        document.getElementById('modal-root')!
      )
    : null;
};

export default Modal;
