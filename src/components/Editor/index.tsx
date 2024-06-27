'use client';

// * @monaco-editor/react
import MonacoEditor, { type Monaco } from '@monaco-editor/react';

// * themes
import githubDark from './theme.json';

// * hooks
import { useAppContext } from '@/context/AppContext';

// * components
import Loader from './Loader';

const Editor = () => {
  const { markdown, setMarkdown } = useAppContext();

  const changeHandler = (newMarkdown?: string) => {
    localStorage.setItem('__readme_md__', newMarkdown ?? '');
    setMarkdown(newMarkdown ?? '');
  };

  const mountHandler = (_: unknown, monaco: Monaco) => {
    // @ts-ignore
    monaco.editor.defineTheme('github-dark', githubDark);
    monaco.editor.setTheme('github-dark');
  };

  return (
    <div className='h-full bg-primary'>
      <MonacoEditor
        width='100%'
        height='100%'
        theme='vs-dark'
        value={markdown}
        language='markdown'
        loading={<Loader />}
        onMount={mountHandler}
        onChange={changeHandler}
        className='overflow-hidden'
        options={{ fontSize: 16, wordWrap: 'on' }}
      />
    </div>
  );
};

export default Editor;
