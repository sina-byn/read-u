import { forwardRef } from 'react';

// * hooks
import useClient from '@/hooks/useClient';

// * components
import Button from './ui/Button';

// * icons
import { Fullscreen } from 'lucide-react';

const FullscreenButton = forwardRef<HTMLElement>((_, ref) => {
  const isClient = useClient();
  if (!isClient) return null;

  const isFullscreenSupported = !!(
    document.documentElement.requestFullscreen ||
    // @ts-ignore
    document.documentElement.webkitRequestFullscreen ||
    // @ts-ignore
    document.documentElement.mozRequestFullScreen ||
    // @ts-ignore
    document.documentElement.msRequestFullscreen
  );

  const fullscreenHandler = () => {
    if (!isFullscreenSupported) return;

    const el = (ref as React.RefObject<HTMLElement>)?.current;

    el?.requestFullscreen()
      .then()
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <Button
      variant='secondary'
      onClick={fullscreenHandler}
      disabled={!isFullscreenSupported}
      className='hover:bg-primary [&:disabled_*]:opacity-50 border-b-0 rounded-b-none rounded-r-none'
    >
      <Fullscreen />
    </Button>
  );
});

FullscreenButton.displayName = 'FullscreenButton';

export default FullscreenButton;
