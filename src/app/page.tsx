'use client';

// * utils
import { cn, extractHeadings } from '@/utils';

// * hooks
import { useAppContext } from '@/context/AppContext';

// * components
import Tabs from '@/components/Tabs';
import Editor from '@/components/Editor';
import RawMarkdown from '@/components/RawMarkdown';
import MarkdownDisplay from '@/components/MarkdownDisplay';

// * events
import { EditorScrollEvent } from '@/utils/events';

const Home = () => {
  const { view, markdown } = useAppContext();
  const headings = extractHeadings(markdown);

  return (
    <main className='h-[calc(100svh_-_8.5rem)] py-8'>
      <div className='i-container flex gap-x-6 h-full overflow-hidden'>
        <aside className='sections shrink-0 w-[300px] bg-primary border border-neutral rounded-md overflow-hidden'>
          <header className='flex items-center gap-x-6 h-10 text-info border-b border-neutral px-4'>
            <span>
              {headings.length} {headings.length === 1 ? 'section' : 'sections'}
            </span>
          </header>

          <div className='sections-list h-[calc(100%_-_2.5rem)] overflow-y-auto'>
            <ul>
              {headings?.map(heading => (
                <li
                  key={heading.line}
                  className='flex items-center border-b border-neutral odd:bg-primary-light'
                >
                  <button
                    type='button'
                    onClick={EditorScrollEvent.dispatch.bind(null, heading.line)}
                    className='w-full text-info text-left text-sm truncate px-4 py-3'
                  >
                    L<span className='px-0.5'>:</span>
                    {heading.line}
                    <span className='text-white'>
                      &nbsp;- <span className='capitalize'>{heading.tag}</span> - {heading.text}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className='size-full'>
          <div
            className={cn(
              'split-view grid grid-cols-2 gap-x-6 h-full',
              view !== 'split' && 'hidden'
            )}
          >
            <div className='left grow overflow-hidden'>
              <Tabs heads={['editor']}>
                <Editor />
              </Tabs>
            </div>

            <div className='right overflow-hidden'>
              <Tabs heads={['preview', 'raw']}>
                <MarkdownDisplay />
                <RawMarkdown />
              </Tabs>
            </div>
          </div>

          <div className={cn('tabs-view h-full', view !== 'tabs' && 'hidden')}>
            <Tabs heads={['editor', 'preview', 'raw']}>
              <Editor />
              <MarkdownDisplay />
              <RawMarkdown />
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
