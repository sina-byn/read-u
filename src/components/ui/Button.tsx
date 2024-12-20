import type { ButtonHTMLAttributes } from 'react';

// * utils
import { cn } from '@/utils';

// * types
type ButtonProps = {
  base?: boolean;
  variant?: Exclude<keyof typeof variants, 'base'>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// * data
const variants = {
  base: 'flex items-center justify-center gap-2 h-10 rounded-md px-3',
  success: 'bg-success',
  secondary: 'bg-primary-light border border-neutral',
};

const Button = ({
  type = 'button',
  className,
  children,
  base = true,
  variant = 'success',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(base && variants.base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
