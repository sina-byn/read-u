'use client';

import { useRef, useState } from 'react';

// * utils
import { cn } from '@/utils';

// * components
import Button from './ui/Button';
import ExpandButton from './ExpandButton';
import FullscreenButton from './FullscreenButton';

// * types
type TabsProps = {
  heads: string[];
  children: JSX.Element | JSX.Element[];
};

const Tabs = ({ heads, children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabRef = useRef<HTMLDivElement>(null);

  const tab = Array.isArray(children) ? children[activeTab] : children;

  return (
    <div className='tabs grid grid-rows-[auto,_1fr] h-full'>
      <header className='flex justify-between gap-x-6 h-10'>
        <div className='left flex'>
          {heads.map((head, index) => (
            <Button
              key={head}
              variant='secondary'
              onClick={setActiveTab.bind(null, index)}
              className={cn(
                'capitalize border-b-0 rounded-none first:rounded-tl-md last:rounded-tr-md',
                index === activeTab && 'bg-primary'
              )}
            >
              {head}
            </Button>
          ))}
        </div>

        <div className='right flex'>
          <FullscreenButton ref={tabRef} />
          <ExpandButton title={heads[activeTab]}>{tab}</ExpandButton>
        </div>
      </header>

      <div ref={tabRef} className='tab h-full border border-neutral rounded-b-md overflow-y-auto'>
        {tab}
      </div>
    </div>
  );
};

export default Tabs;
