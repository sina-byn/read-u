'use client';

// * hooks
import { useEditorContext } from '@/context/EditorContext';

const RawMarkdown = () => {
  const { markdown } = useEditorContext();

  return (
    <div className='wrapper h-full bg-primary overflow-hidden py-8 px-10'>
      <div className='h-full overflow-auto'>
        <code className='whitespace-pre overflow-'>{markdown}</code>
      </div>
    </div>
  );
};

export default RawMarkdown;
