'use client';

// * hooks
import { useAppContext } from '@/context/AppContext';

const RawMarkdown = () => {
  const { markdown } = useAppContext();

  return (
    <div className='wrapper h-full bg-primary overflow-hidden p-8'>
      <code className='whitespace-pre'>{markdown}</code>
    </div>
  );
};

export default RawMarkdown;
