'use client';

// * hooks
import { useAppContext } from '@/context/AppContext';

// * components
import Select from './ui/Select';

// * icons
import { Palette } from 'lucide-react';

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
  const { theme, setTheme } = useAppContext();

  const changeHandler = (newTheme: Theme) => {
    localStorage.setItem('__gfm_theme__', newTheme);
    setTheme(newTheme);
  };

  return (
    <header className='toolbar flex items-center h-16 bg-primary'>
      <div className='i-container flex items-center justify-between gap-x-6'>
        <div className='left'></div>
        <div className='right'>
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
