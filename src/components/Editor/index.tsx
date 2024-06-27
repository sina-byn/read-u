'use client';

import { useRef, useEffect } from 'react';

// * @monaco-editor/react
import MonacoEditor, { type Monaco } from '@monaco-editor/react';

// * themes
import githubDark from './theme.json';

// * hooks
import { useAppContext } from '@/context/AppContext';

// * components
import Loader from './Loader';

// * events
import { EditorScrollEvent } from '@/utils/events';

const Editor = () => {
  const { markdown, setMarkdown } = useAppContext();
  const editorRef = useRef<unknown>(null);

  const changeHandler = (newMarkdown?: string) => {
    localStorage.setItem('__readme_md__', newMarkdown ?? '');
    setMarkdown(newMarkdown ?? '');
  };

  const mountHandler = (editor: unknown, monaco: Monaco) => {
    editorRef.current = editor;

    // @ts-ignore
    monaco.editor.defineTheme('github-dark', githubDark);
    monaco.editor.setTheme('github-dark');
  };

  useEffect(() => {
    const scrollHandler = (e: CustomEvent) => {
      const editor = editorRef.current;

      if (!editor) return;

      const line = +e.detail;
      // @ts-ignore
      editor.revealLine(line);
    };

    // @ts-ignore
    window.addEventListener(EditorScrollEvent.event, scrollHandler);

    // @ts-ignore
    return () => window.removeEventListener(EditorScrollEvent.event, scrollHandler);
  }, []);

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
