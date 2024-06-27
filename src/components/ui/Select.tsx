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

type SelectProps = {
  options: Option[];
  defaultOption?: Option;
  className?: string;
  onChange?: (value: string) => void;
};

const Select = ({ options, defaultOption, className, onChange }: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState<Option>(defaultOption ?? options[0]);
  const [open, setOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const closeHandler = () => setOpen(false);
  const toggleHandler = () => setOpen(prev => !prev);
  useClickOutside(selectRef, closeHandler);

  const changeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const title = e.currentTarget.dataset.title!;
    const value = e.currentTarget.dataset.value!;

    setSelectedOption({ title, value });
    onChange?.(value);
    closeHandler();
  };

  return (
    <div ref={selectRef} className='select relative w-fit'>
      <Button
        variant='secondary'
        onClick={toggleHandler}
        className={cn('justify-between px-3', className)}
      >
        <span className='truncate'>{selectedOption.title}</span>
        <ChevronDown size={16} className='shrink-0' />
      </Button>

      <div
        className={cn(
          'options absolute inset-x-0 bg-primary border border-neutral rounded-md overflow-hidden transition-all duration-300 mt-2',
          open ? 'top-full pointer-events-auto opacity-100' : 'top-2 pointer-events-none opacity-0'
        )}
      >
        {options.map(option => (
          <button
            type='button'
            onClick={changeHandler}
            data-value={option.value}
            data-title={option.title}
            className='flex items-center justify-center w-full h-8 bg-primary even:bg-primary-light hover:bg-primary-dark border-b border-neutral last:border-b-0 cursor-pointer'
          >
            {option.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
