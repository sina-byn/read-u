import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'READ-U.md',
  description:
    'a web application that assists in creating GitHub README.md files, featuring real-time Markdown preview and a Markdown table editor, both supporting tab synchronization',
  keywords: [
    'markdown',
    'markdown editor',
    'online markdown editor',
    'readme',
    'readme editor',
    'online readme editor',
    'markdown table editor',
    'online markdown table editor',
    'readme.md',
    'github readme',
    'markdown cheatsheet',
  ],
  openGraph: {
    images: '/images/read-u.png',
  },
  twitter: {
    images: '/images/read-u.png',
  },
};

// * types
type LayoutProps = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <body className='h-svh bg-primary-dark text-gray-200'>{children}</body>
    </html>
  );
}
