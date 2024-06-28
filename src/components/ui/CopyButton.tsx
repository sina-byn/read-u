// * components
import { useState } from 'react';
import Button from './Button';

// * icons
import { Clipboard, ClipboardCheck } from 'lucide-react';

// * types
type CopyButtonProps = { text: string };

const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyHandler = () => {
    if (!text.length || !('clipboard' in navigator)) {
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
        console.error(err);
      });
  };

  return (
    <Button disabled={copied} variant='info' className='w-32' onClick={copyHandler}>
      {copied ? <ClipboardCheck className='shrink-0' /> : <Clipboard className='shrink-0' />}
      <span className='font-medium capitalize -mt-0.5'>{copied ? 'copied' : 'copy'}</span>
    </Button>
  );
};

export default CopyButton;
