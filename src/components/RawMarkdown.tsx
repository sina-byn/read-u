'use client';

// * hooks
import { useAppContext } from '@/context/AppContext';

const RawMarkdown = () => {
  const { markdown } = useAppContext();

  return (
    <div className='wrapper h-full bg-primary overflow-hidden'>
      <textarea
        readOnly
        value={markdown}
        className='resize-none size-full bg-transparent text-base md:text-lg focus:outline-none p-8'
      />
    </div>
  );
};

export default RawMarkdown;
