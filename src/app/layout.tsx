import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// * utils
import { cn } from '@/utils';

// * components
import Toolbar from '@/components/Toolbar';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

// * types
type LayoutProps = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'h-svh bg-primary-dark text-gray-200')}>
        <header className='h-16 md:h-24'>
          <div className='i-container'></div>
        </header>
        <Toolbar />
        {children}
        <div id='modal-root' />
      </body>
    </html>
  );
}
