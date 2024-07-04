import { useState } from 'react';

// * react-toastify
import { toast } from 'react-toastify';

// * hooks
import { useEditorContext } from '@/context/EditorContext';

// * utils
import { cn } from '@/utils';

// * components
import Modal from './ui/Modal';
import Button from './ui/Button';
import PhotoViewer from './PhotoViewer';

// * icons
import { X, LayoutTemplate } from 'lucide-react';

// * data
import templates from '@/templates/templates.json';

const BASE_URL = 'https://github.com/sina-byn/readme-gen/blob/main/src/templates';

const Templates = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { setMarkdown } = useEditorContext();

  return (
    <>
      <Button variant='secondary' className='capitalize' onClick={setOpen.bind(null, true)}>
        <LayoutTemplate className='' />
        templates
      </Button>

      <Modal open={open} setOpen={setOpen} className={cn(templates.length > 0 && 'i-modal')}>
        {closeHandler => (
          <article className='h-full bg-primary rounded-md overflow-hidden'>
            <header className='flex items-center justify-between gap-x-6 h-12 border-b border-neutral px-3'>
              <span className='capitalize'>templates</span>
              <button type='button' onClick={closeHandler}>
                <X />
              </button>
            </header>

            <div className='h-[calc(100%_-_3rem)] overflow-y-auto'>
              {templates.length > 0 ? (
                <div className='inner grid grid-cols-4 items-start gap-4 min-h-full p-3'>
                  {templates.map(t => {
                    const importHandler = () => {
                      setMarkdown(t.markdown);
                      setOpen(false);

                      toast.success('Template imported successfully');
                    };

                    return (
                      <div
                        key={t.fileName}
                        className='template-card w-full h-fit bg-primary-dark border border-neutral rounded-md overflow-hidden'
                      >
                        <PhotoViewer alt={t.title} src={t.screenshot} />

                        <div className='p-3'>
                          <p className='text-lg'>{t.title[0].toUpperCase() + t.title.slice(1)}</p>

                          <a
                            target='_blank'
                            rel='noopener noreferrer'
                            href={`${BASE_URL}/${t.fileName}`}
                            className='source text-success text-sm font-medium underline'
                          >
                            source
                          </a>

                          {t.tags?.length && (
                            <div className='tags flex flex-wrap gap-2 text-sm capitalize mt-4'>
                              {Array.from(new Set(t.tags)).map(tag => (
                                <div
                                  key={tag}
                                  className='tag inline-flex items-center justify-center bg-success/15 text-success font-medium border border-success rounded-md pt-1 pb-1.5 px-2'
                                >
                                  {tag}
                                </div>
                              ))}
                            </div>
                          )}

                          <Button className='w-full mt-3' onClick={importHandler}>
                            Import
                          </Button>
                        </div>
                      </div>
                    );
                  })}

                  <div className='col-span-4 self-end flex justify-center mt-10'>
                    <div className='max-w-full max-w-[500px] bg-info/10 text-gray-200 text-center border border-info rounded-md p-3'>
                      <p className='text-sm'>
                        All contributions are welcomed! If you have any README templates that you
                        think can be useful to the community, please create a pull request to the
                        project's GitHub repository
                        <a
                          target='_blank'
                          rel='noopener noreferrer nofollow'
                          href='https://github.com/sina-byn/read-u'
                          className='text-info underline ml-1'
                        >
                          here
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='min-w-[250px] text-center text-gray-400 py-8'>
                  No templates were found
                </div>
              )}
            </div>
          </article>
        )}
      </Modal>
    </>
  );
};

export default Templates;
