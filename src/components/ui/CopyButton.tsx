import { useState } from 'react';

// * react-toastify
import { toast } from 'react-toastify';

// * utils
import { cn } from '@/utils';

// * components
import Button from './Button';

// * icons
import { Clipboard, ClipboardCheck } from 'lucide-react';

// * types
type CopyButtonProps = { text: string; className?: string };

const CopyButton = ({ text, className }: CopyButtonProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyHandler = () => {
    if (!text || !text.length) return;

    if (!('clipboard' in navigator)) {
      toast.error('This feature is not supported by your browser');
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);

        const timeoutId = setTimeout(() => {
          setCopied(false);
          clearTimeout(timeoutId);
        }, 500);
      })
      .catch(err => {
        toast.error('Failed to copy markdown to clipboard. Please try again or copy it manually.');
        console.error(err);
      });
  };

  return (
    <Button
      disabled={copied}
      variant='success'
      onClick={copyHandler}
      className={cn('sm:w-auto xl:w-24', className)}
    >
      {copied ? (
        <ClipboardCheck size={22} className='shrink-0' />
      ) : (
        <Clipboard size={22} className='shrink-0' />
      )}
      <span className='sm:max-xl:hidden capitalize -mt-0.5'>{copied ? 'copied' : 'copy'}</span>
    </Button>
  );
};

export default CopyButton;
