// * hooks
import { useEditorContext } from '@/context/EditorContext';

// * components
import Button from './ui/Button';

// * icons
import { Download } from 'lucide-react';

const DownloadButton = () => {
  const { markdown } = useEditorContext();

  const downloadHandler = () => {
    if (!markdown.trim().length) return;

    const link = document.createElement('a');
    const markdownBlob = new Blob([markdown], { type: 'text/plain' });

    link.href = URL.createObjectURL(markdownBlob);
    link.download = 'README.md';
    link.click();

    URL.revokeObjectURL(link.href);
    link.remove();
  };

  return (
    <Button onClick={downloadHandler} className='download-button capitalize'>
      <Download size={22} className='shrink-0' />
      download
    </Button>
  );
};

export default DownloadButton;
