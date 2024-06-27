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
  closeable?: boolean;
  className?: string;
  children: React.ReactNode | ((closeHandler: () => void) => React.ReactNode);
};

const Modal = ({ open, setOpen, className, children, closeable = true }: ModalProps) => {
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
          onClick={backdropClickHandler}
          className='modal-backdrop flex items-center justify-center fixed inset-0 z-50 bg-black/50'
        >
          <div className={cn('modal-wrapper size-fit', className)} onClick={clickHandler}>
            {typeof children === 'function' ? children(closeHandler) : children}
          </div>
        </div>,
        document.getElementById('modal-root')!
      )
    : null;
};

export default Modal;
