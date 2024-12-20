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
  onClose?: Function;
  zIndex?: number;
  closeable?: boolean;
  className?: string;
  backdropClassName?: string;
  backdropCloseable?: boolean;
  children: React.ReactNode | ((closeHandler: () => void) => React.ReactNode);
};

const Modal = ({
  open,
  setOpen,
  onClose,
  className,
  children,
  zIndex = 50,
  closeable = true,
  backdropClassName,
  backdropCloseable = true,
}: ModalProps) => {
  const isClient = useClient();

  const closeHandler = () => {
    if (!closeable) return;

    setOpen(false);
    onClose?.();
  };

  const clickHandler = (e: React.MouseEvent) => e.stopPropagation();

  const backdropClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!backdropCloseable) return;

    closeHandler();
  };

  return isClient && open
    ? createPortal(
        <div
          style={{ zIndex }}
          onClick={backdropClickHandler}
          className={cn(
            'modal-backdrop flex items-center justify-center fixed inset-0 bg-black/90',
            backdropClassName
          )}
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
