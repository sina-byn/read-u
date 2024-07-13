'use client';

// * dompurify
import DOMPurify from 'isomorphic-dompurify';

// * showdown
import Showdown from 'showdown';

// * utils
import { cn } from '@/utils';

// * hooks
import { useEditorContext } from '@/context/EditorContext';

const converter = new Showdown.Converter();
converter.setFlavor('github');

import '@/app/gfm.css';

const MarkdownDisplay = () => {
  const { theme, markdown } = useEditorContext();
  const HTML = converter.makeHtml(markdown);
  const sanitizedHTML = DOMPurify.sanitize(HTML);

  return (
    <div className={cn(theme, 'h-full rounded-b-md')}>
      <article
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        className='markdown-body h-fit min-h-full rounded-b-md p-8 [&_ul]:list-[revert]'
      />
    </div>
  );
};

export default MarkdownDisplay;
