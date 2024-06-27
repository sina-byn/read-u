'use client';

// * dompurify
import DOMPurify from 'dompurify';

// * showdown
import Showdown from 'showdown';

// * utils
import { cn } from '@/utils';

// * hooks
import { useAppContext } from '@/context/AppContext';

const converter = new Showdown.Converter();
converter.setFlavor('github');

import '@/app/gfm.css';

const MarkdownDisplay = () => {
  const { theme, markdown } = useAppContext();
  const HTML = converter.makeHtml(markdown);
  const sanitizedHTML = DOMPurify.sanitize(HTML);

  return (
    <div className={cn(theme, 'h-full rounded-b-md')}>
      <article
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        className='markdown-body h-fit rounded-b-md p-8'
      />
    </div>
  );
};

export default MarkdownDisplay;
