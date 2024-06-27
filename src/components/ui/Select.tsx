'use client';

import { useRef, useState } from 'react';

// * utils
import { cn } from '@/utils';

// * hooks
import useClickOutside from '@/hooks/useClickOutside';

// * components
import Button from './Button';

// * icons
import { ChevronDown } from 'lucide-react';

// * types
type Option = { title: string; value: string };

type SelectProps<T> = {
  icon?: React.ReactNode;
  options: Option[];
  defaultOption?: Option;
  className?: string;
  onChange?: (value: T) => void;
};

const Select = <T extends string>({
  icon,
  options,
  defaultOption,
  className,
  onChange,
}: SelectProps<T>) => {
  const [selectedOption, setSelectedOption] = useState<Option>(defaultOption ?? options[0]);
  const [open, setOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const closeHandler = () => setOpen(false);
  const toggleHandler = () => setOpen(prev => !prev);
  useClickOutside(selectRef, closeHandler);

  const changeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const title = e.currentTarget.dataset.title!;
    const value = e.currentTarget.dataset.value! as T;

    setSelectedOption({ title, value });
    onChange?.(value);
    closeHandler();
  };

  return (
    <div ref={selectRef} className='select relative w-fit'>
      <Button
        variant='secondary'
        onClick={toggleHandler}
        className={cn('justify-between px-3 overflow-hidden', className)}
      >
        <div className='inner flex items-center gap-x-3 overflow-hidden'>
          <span className='shrink-0'>{icon}</span>
          <span className='truncate'>{selectedOption.title}</span>
        </div>
        <ChevronDown size={16} className='shrink-0' />
      </Button>

      <div
        className={cn(
          'options absolute inset-x-0 z-10 w-full bg-primary-dark border border-neutral rounded-md overflow-hidden transition-all duration-300 overflow-hidden mt-2',
          open ? 'top-full pointer-events-auto opacity-100' : 'top-2 pointer-events-none opacity-0'
        )}
      >
        {options.map(option => (
          <button
            type='button'
            key={option.title}
            onClick={changeHandler}
            data-value={option.value}
            data-title={option.title}
            className={cn(
              'flex items-center justify-center w-full h-8 truncate capitalize hover:bg-primary-dark border-b border-neutral last:border-b-0 cursor-pointer px-10',
              option.value === selectedOption.value
                ? 'bg-blue-900/60'
                : 'bg-primary even:bg-primary-light'
            )}
          >
            {option.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
