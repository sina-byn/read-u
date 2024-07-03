import { renderToStaticMarkup } from 'react-dom/server';

// * icons
import { CircleHelp } from 'lucide-react';

const ShortcutsTooltip = () => {
  const html = (
    <div className='max-w-[260px] md:max-w-[450px] [&_span]:font-[consolas] [&_span]:text-sm'>
      <div className='text-base font-medium capitalize border-b border-neutral p-2'>
        shortcut guide
      </div>

      <div className='shortcuts space-y-2'>
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
              <span>remove focused cell&apos;s row</span>
            </li>

            <li className='flex gap-x-1'>
              <span>-</span>
              <span>doesn&apos;t work if no cell is focused</span>
            </li>
          </ul>
        </div>

        <div className='i-shortcut'>
          <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd>
          <ul className='space-y-1'>
            <li className='flex gap-x-1'>
              <span>-</span>
              <span>remove focused cell&apos;s column</span>
            </li>

            <li className='flex gap-x-1'>
              <span>-</span>
              <span>doesn&apos;t work if no cell is focused</span>
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
