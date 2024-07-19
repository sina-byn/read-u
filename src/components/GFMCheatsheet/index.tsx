import { useState } from 'react';

// * components
import Modal from '../ui/Modal';
import Button from '../ui/Button';

// * icons
import { X, FileCode2 } from 'lucide-react';

// * data
import cheatsheet from './cheatsheet.json';
import CopyButton from '../ui/CopyButton';

const GFMCheatsheet = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant='secondary'
        onClick={setOpen.bind(null, true)}
        data-tooltip-id='tooltip'
        data-tooltip-class-name='min-w-fit'
        data-tooltip-content='Github Flavored Markdown Cheatsheet'
      >
        <FileCode2 size={22} className='shrink-0' />
        <span className='hidden lg:inline'>GFM Cheatsheet</span>
      </Button>

      <Modal open={open} setOpen={setOpen} className='h-full py-4'>
        {closeHandler => (
          <article className='gfm-cheatsheet h-full bg-primary border border-neutral rounded-md overflow-hidden'>
            <header className='flex items-center justify-between gap-x-6 h-12 border-b border-neutral px-3'>
              <span className='capitalize'>GFM Cheatsheet</span>

              <button type='button' onClick={closeHandler}>
                <X />
              </button>
            </header>

            <div className='h-[calc(100%_-_3rem)] overflow-y-auto overflow-x-hidden p-3 pt-0'>
              <div className='[&_:first-child_h4]:mt-3'>
                {cheatsheet.map(table => (
                  <div key={table.category}>
                    <h4 className='text-lg font-semibold capitalize border-b border-neutral pb-2 mt-4'>
                      {table.category}
                    </h4>

                    <table className='w-full border-b border-neutral'>
                      <tbody>
                        {table.self.map((row, index) => (
                          <tr
                            key={index}
                            className='bg-primary-dark odd:bg-primary-light hover:text-info whitespace-pre'
                          >
                            <td className='py-2 px-4'>{row[0]}</td>
                            <td className='py-2 px-4'>{row[1]}</td>

                            {row.length > 2 &&
                              row
                                .slice(2)
                                .map(cell => <td key={cell}>{cell === 'no-copy' ? '' : cell}</td>)}

                            <td>
                              {!table.config?.noCopy?.includes(index) &&
                                (() => {
                                  const copyIndex = table.config?.copyIndex ?? 0;
                                  const [toReplace, replaceWith] = table.config?.replace ?? [];
                                  let textToCopy = row[copyIndex].trim();

                                  console.log(toReplace, replaceWith);

                                  if (toReplace) {
                                    textToCopy = textToCopy.replace(
                                      new RegExp(toReplace, 'g'),
                                      replaceWith,
                                    );
                                  }

                                  return (
                                    <div className='flex justify-end'>
                                      <CopyButton
                                        text={textToCopy}
                                        className='w-fit bg-transparent [&_>_span]:hidden'
                                      />
                                    </div>
                                  );
                                })()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              <div>
                <h4 className='text-lg font-semibold capitalize border-b border-neutral pb-2 mt-4'>
                  tables
                </h4>

                <table className='w-full border-b border-neutral'>
                  <tbody>
                    <tr className='bg-primary-dark odd:bg-primary-light hover:text-info whitespace-pre'>
                      <td className='py-2 px-4'>
                        Use READ-U's
                        <a
                          target='_blank'
                          href='?table_editor=true'
                          className='text-info font-primary underline ml-1'
                        >
                          Table Editor
                        </a>
                        .
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className='mt-3'>
                Visit
                <a
                  target='_blank'
                  rel='noopener noreferrer nofollow'
                  className='text-info underline px-1'
                  href='https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax'
                >
                  Github's official docs
                </a>
                for more.
              </p>
            </div>
          </article>
        )}
      </Modal>
    </>
  );
};

export default GFMCheatsheet;
