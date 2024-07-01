'use client';

import Link from 'next/link';
import { Suspense } from 'react';

// * hooks
import { useEditorContext, type View } from '@/context/EditorContext';

// * utils
import { cn } from '@/utils';

// * providers
import TableEditorContextProvider from '@/context/TableEditorContext';

// * components
import Select from './ui/Select';
import Button from './ui/Button';
import Templates from './Templates';
import TableEditor from './TableEditor';
import CopyButton from './ui/CopyButton';
import DownloadButton from './DownloadButton';

// * icons
import { Palette, AppWindow, PictureInPicture, SquareSplitHorizontal } from 'lucide-react';

// * data
export const themes = [
  'light',
  'dark',
  'dark-dimmed',
  'dark-high-contrast',
  'dark-colorblind',
  'light-colorblind',
  'light-high-contrast',
  'light-tritanopia',
  'dark-tritanopia',
] as const;

// * types
export type Theme = (typeof themes)[number];

const Toolbar = () => {
  const { view, setView, theme, setTheme, markdown } = useEditorContext();

  const changeHandler = (newTheme: Theme) => {
    localStorage.setItem('__gfm_theme__', newTheme);
    setTheme(newTheme);
  };

  const viewToggleHandler = (newView: View) => {
    localStorage.setItem('__markdown_editor_view__', newView);
    setView(newView);
  };

  return (
    <header className='toolbar flex items-center h-fit bg-primary py-4'>
      <div className='i-container flex items-center justify-between gap-x-6'>
        <div className='left flex items-center gap-x-6'>
          <Templates />

          <Suspense>
            <TableEditorContextProvider>
              <TableEditor />
            </TableEditorContextProvider>
          </Suspense>

          <div className='view-toggle flex'>
            <Button
              variant='secondary'
              onClick={viewToggleHandler.bind(null, 'tabs')}
              className={cn('rounded-r-none border-r-0', view === 'tabs' && 'bg-primary-dark')}
            >
              <AppWindow />
            </Button>

            <Button
              variant='secondary'
              onClick={viewToggleHandler.bind(null, 'split')}
              className={cn('rounded-l-none', view === 'split' && 'bg-primary-dark')}
            >
              <SquareSplitHorizontal />
            </Button>
          </div>

          <Button className='new-tab-button p-0' variant='secondary'>
            <Link href='/' target='_blank' className='h-full flex items-center justify-center px-3'>
              <PictureInPicture size={22} className='shrink-0 -scale-y-100' />
            </Link>
          </Button>
        </div>

        <div className='right flex items-center gap-x-6'>
          <Select<Theme>
            key={theme}
            onChange={changeHandler}
            className='w-52 capitalize'
            icon={<Palette size={22} />}
            defaultOption={{ title: theme.replace(/-/g, ' '), value: theme }}
            options={themes.map(theme => ({ title: theme.replace(/-/g, ' '), value: theme }))}
          />

          <CopyButton text={markdown} />

          <DownloadButton />
        </div>
      </div>
    </header>
  );
};

export default Toolbar;
