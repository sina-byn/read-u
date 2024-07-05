import type { Metadata } from 'next';
import './globals.css';

// * react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// * providers
import EditorContextProvider from '@/context/EditorContext';

// * components
import Toolbar from '@/components/Toolbar';
import Tooltip from '@/components/ui/Tooltip';

export const metadata: Metadata = {
  title: 'READ-U.md',
  description:
    'a web application that assists in creating GitHub README.md files, featuring real-time Markdown preview and a Markdown table editor, both supporting tab synchronization',
};

// * types
type LayoutProps = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <body className='h-svh bg-primary-dark text-gray-200'>
        <EditorContextProvider>
          <header className='h-16'>
            <div className='i-container flex items-center justify-between h-full'>
              <h1 className='text-lg font-bold font-[consolas]'>READ-U.md</h1>

              <div className='links flex items-center gap-x-4'>
                <a
                  target='_blank'
                  rel='noopener noreferrer nofollow'
                  href='https://www.linkedin.com/in/sina-bayandorian/'
                >
                  {/* eslint-disable-next-line */}
                  <img src='/icons/linkedin.svg' className='size-6' />
                </a>

                <a
                  target='_blank'
                  rel='noopener noreferrer nofollow'
                  href='https://github.com/sina-byn/read-u'
                >
                  {/* eslint-disable-next-line */}
                  <img src='/icons/github.svg' className='size-6' />
                </a>
              </div>
            </div>
          </header>

          <Toolbar />
          {children}
        </EditorContextProvider>

        <ToastContainer theme='dark' autoClose={3000} toastClassName='!bg-primary-light mr-1' />
        <Tooltip />
        <div id='modal-root' />
      </body>
    </html>
  );
}
