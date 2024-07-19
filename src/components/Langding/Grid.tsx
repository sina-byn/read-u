'use client';

import { useEffect } from 'react';

// * animejs
import anime from 'animejs';

// * utils
import { cn } from '@/utils';

// * data
const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;

const animate = (target: string, from: 'center' | number) => {
  anime({
    targets: `.${target}`,
    scale: [
      { value: 1.35, easing: 'easeOutSine', duration: 250 },
      { value: 1, easing: 'easeInOutQuad', duration: 500 },
    ],
    translateY: [
      { value: -15, easing: 'easeOutSine', duration: 250 },
      { value: 0, easing: 'easeInOutQuad', duration: 500 },
    ],
    opacity: [
      { value: 1, easing: 'easeOutSine', duration: 250 },
      { value: 0.5, easing: 'easeInOutQuad', duration: 500 },
    ],
    delay: anime.stagger(100, { grid: [GRID_WIDTH, GRID_HEIGHT], from }),
  });
};

// * types
type GridProps = { id: string; className?: string };

const Grid = ({ id, className }: GridProps) => {
  const dotClickHandler = (e: React.MouseEvent<HTMLDivElement>) => animate(id, +e.currentTarget.id);

  const dots = Array.from({ length: GRID_WIDTH * GRID_HEIGHT }, (_, index) => (
    <div
      key={index}
      id={index + ''}
      onClick={dotClickHandler}
      className='group hover:bg-slate-600 rounded-full transition-colors cursor-crosshair p-2'
    >
      <div
        className={cn(
          'dot size-1.5 rounded-full opacity-50 bg-gradient-to-b from-slate-700 to-slate-400 group-hover:from-indigo-600 group-hover:to-white',
          id,
        )}
      />
    </div>
  ));

  useEffect(() => {
    const intervalId = setInterval(() => animate(id, 'center'), 12000);

    const timeoutId = setTimeout(() => {
      animate(id, 'center');
      clearTimeout(timeoutId);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className={cn('grid w-fit', className)}
      style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
    >
      {dots}
    </div>
  );
};

export default Grid;
