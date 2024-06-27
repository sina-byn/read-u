// * components
import Tabs from '@/components/Tabs';
import Editor from '@/components/Editor';
import RawMarkdown from '@/components/RawMarkdown';
import MarkdownDisplay from '@/components/MarkdownDisplay';

const Home = () => {
  return (
    <main className='py-8'>
      <div className='i-container h-full'>
        <Tabs heads={['editor', 'preview', 'raw']}>
          <Editor />
          <MarkdownDisplay />
          <RawMarkdown />
        </Tabs>
      </div>
    </main>
  );
};

export default Home;
