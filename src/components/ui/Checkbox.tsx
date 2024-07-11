import { Check } from 'lucide-react';

// * types
type CheckboxProps = { onChange?: (checked: boolean) => void; children?: React.ReactNode };

const Checkbox = ({ onChange, children }: CheckboxProps) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    const label = e.currentTarget.parentElement!;

    label.classList.toggle('checked', checked);
    onChange?.(checked);
  };

  return (
    <label className='flex flex-wrap items-center gap-x-2 cursor-pointer [&.checked_.checkbox]:bg-info/70 [&:not(.checked)_.check]:hidden'>
      <div className='checkbox flex items-center justify-center size-4 border border-neutral rounded-sm'>
        <Check size={14} strokeWidth={3} className='check' />
      </div>
      <span className='text-sm select-none'>{children}</span>
      <input type='checkbox' className='hidden size-0 opacity-0' onChange={changeHandler} />
    </label>
  );
};

export default Checkbox;
