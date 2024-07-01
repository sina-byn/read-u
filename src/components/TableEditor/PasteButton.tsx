// * react-toastify
import { toast } from 'react-toastify';

// * utils
import { markdownToVector } from '@/utils/vector';

// * hooks
import { useTableEditorContext } from '@/context/TableEditorContext';

// * components
import Button from '../ui/Button';

// * icons
import { ClipboardPaste } from 'lucide-react';

const PasteButton = () => {
  const { setVector, forceUpdate } = useTableEditorContext();

  const pasteHandler = () => {
    if (!('clipboard' in navigator)) {
      toast.error('This feature is not supported by your browser');
      return;
    }

    navigator.clipboard
      .readText()
      .then(pastedText => {
        if (!pastedText) return;

        const vector = markdownToVector(pastedText);
        if (!vector) return;

        forceUpdate();
        setVector(vector);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <Button onClick={pasteHandler}>
      <ClipboardPaste className='shrink-0' />
      Paste
    </Button>
  );
};

export default PasteButton;
