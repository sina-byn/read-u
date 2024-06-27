'use client';

// * hooks
import { useAppContext } from '@/context/AppContext';

// * components
import Tabs from '@/components/Tabs';
import Editor from '@/components/Editor';
import RawMarkdown from '@/components/RawMarkdown';
import MarkdownDisplay from '@/components/MarkdownDisplay';

const Home = () => {
  const { view } = useAppContext();

  return (
    <main className='py-8'>
      <div className='i-container h-full'>
        {view === 'split' && (
          <div className='split-view grid grid-cols-2 gap-x-6 h-full'>
            <Tabs heads={['editor']}>
              <Editor />
            </Tabs>
            <Tabs heads={['preview', 'raw']}>
              <MarkdownDisplay />
              <RawMarkdown />
            </Tabs>
          </div>
        )}
        {view === 'tabs' && (
          <Tabs heads={['editor', 'preview', 'raw']}>
            <Editor />
            <MarkdownDisplay />
            <RawMarkdown />
          </Tabs>
        )}
      </div>
    </main>
  );
};

export default Home;
