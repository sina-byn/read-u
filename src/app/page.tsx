import Link from 'next/link';
import Image from 'next/image';

// * components
import Grid from '@/components/Langding/Grid';

// * icons
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <main className='landing relative w-screen h-svh overflow-x-hidden'>
      <Grid id='grid-tr' className='top-grid fixed top-0 right-0' />

      <div className='flex flex-col items-center absolute inset-0 z-10 size-full pointer-events-none mx-auto [&_*]:pointer-events-auto'>
        <header className='landing-header shrink-0 flex items-center justify-between gap-x-4 h-20 bg-primary-dark px-6'>
          <div className='left flex items-center gap-x-4'>
            <Image src='/logo.svg' width={40} height={40} alt='logo' />
            <h2 className='text-lg font-bold font-[consolas]'>READ-U.md</h2>
          </div>

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
        </header>

        <div className='landing-body shrink-0 flex flex-col items-center justify-center pt-12 md:pt-28'>
          <hgroup className='text-center font-bold px-8 sm:px-6'>
            <p className='w-full max-w-[700px] text-3xl sm:text-5xl text-center leading-tight'>
              The best online README editor ever
            </p>
            <h1 className='text-4xl sm:text-6xl text-info mt-4'>READ-U.md</h1>
          </hgroup>

          <Link
            href='/editor'
            className='flex items-center gap-x-3 h-12 bg-info rounded-md px-6 mt-10 pb-1'
          >
            <span className='text-xl font-semibold'>Let's Go</span>
            <ArrowRight className='shrink-0 -mb-0.5' />
          </Link>
        </div>

        <Image
          width={1400}
          height={640}
          alt='read-u preview'
          src='/images/read-u.png'
          className='landing-banner border-y xl:border-x border-neutral xl:rounded-md mt-12 md:mt-20'
        />

        <footer className='landing-footer text-center py-10 md:py-20'>
          Made with by &#10084;&nbsp;
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-info'
            href='https://github.com/sina-byn'
          >
            Sina Bayandorian
          </a>
        </footer>
      </div>

      <Grid id='grid-bl' className='bottom-grid fixed bottom-0 left-0' />
    </main>
  );
};

export default HomePage;
