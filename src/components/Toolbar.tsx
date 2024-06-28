'use client';

// * hooks
import { useAppContext, type View } from '@/context/AppContext';

// * utils
import { cn } from '@/utils';

// * components
import Select from './ui/Select';
import Button from './ui/Button';
import TableEditor from './TableEditor';

// * icons
import { Palette, AppWindow, SquareSplitHorizontal } from 'lucide-react';

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
  const { view, setView, theme, setTheme } = useAppContext();

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
          <TableEditor />
        </div>

        <div className='right flex items-center gap-x-6'>
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

          <Select<Theme>
            key={theme}
            onChange={changeHandler}
            className='w-52 capitalize'
            icon={<Palette size={22} />}
            defaultOption={{ title: theme.replace(/-/g, ' '), value: theme }}
            options={themes.map(theme => ({ title: theme.replace(/-/g, ' '), value: theme }))}
          />
        </div>
      </div>
    </header>
  );
};

export default Toolbar;
