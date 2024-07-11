import { renderToStaticMarkup } from 'react-dom/server';

// * icons
import { Command, CircleHelp } from 'lucide-react';

const ShortcutsTooltip = () => {
  const html = (
    <div className='[&_span]:font-[consolas] [&_span]:text-sm'>
      <div className='text-base font-medium capitalize border-b border-neutral p-2'>
        shortcut guide
      </div>

      <div className='shortcuts md:grid grid-cols-2 items-start'>
        <div className='i-shortcut'>
          <kbd>Tab</kbd>
          <span>move to next cell</span>
        </div>

        <div className='i-shortcut'>
          <kbd>Backspace</kbd>
          or
          <kbd className='flex items-center gap-x-2'>
            <Command size={18} className='shrink-0' />
            Delete
          </kbd>
          <span>move to previous cell when current cell is empty</span>
        </div>

        <div className='i-shortcut'>
          <kbd>Shift</kbd>+<kbd>Backspace</kbd>
          <span>move to previous cell</span>
        </div>

        <div className='i-shortcut'>
          <kbd>Shift</kbd>+
          <kbd className='flex items-center gap-x-2'>
            <Command size={18} className='shrink-0' />
            Delete
          </kbd>
          <span>move to previous cell on mac</span>
        </div>

        <div className='i-shortcut'>
          <kbd>Alt</kbd>+<kbd>R</kbd>
          <span>add a new row</span>
        </div>

        <div className='i-shortcut'>
          <kbd>Alt</kbd>+<kbd>C</kbd>
          <span>add a new column</span>
        </div>

        <div className='i-shortcut'>
          <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>
          <ul className='space-y-1'>
            <li className='flex gap-x-1'>
              <span>-</span>
              <span>remove focused cell's row</span>
            </li>

            <li className='flex gap-x-1'>
              <span>-</span>
              <span>doesn't work if no cell is focused</span>
            </li>
          </ul>
        </div>

        <div className='i-shortcut'>
          <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd>
          <ul className='space-y-1'>
            <li className='flex gap-x-1'>
              <span>-</span>
              <span>remove focused cell's column</span>
            </li>

            <li className='flex gap-x-1'>
              <span>-</span>
              <span>doesn't work if no cell is focused</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <CircleHelp
      size={20}
      className='shortcuts-toolip text-gray-400 focus:outline-none'
      data-tooltip-id='tooltip'
      data-tooltip-place='bottom'
      data-tooltip-class-name='!p-0'
      data-tooltip-html={renderToStaticMarkup(html)}
    />
  );
};

export default ShortcutsTooltip;
