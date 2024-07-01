import Image from 'next/image';

// * react-photo-view
import { PhotoView, PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

// * icons
import { ZoomIn } from 'lucide-react';

// * types
type PhotoViewerProps = { alt?: string; src: string };

const PhotoViewer = ({ alt = '', src }: PhotoViewerProps) => {
  return (
    <PhotoProvider>
      <PhotoView src={src}>
        <figure className='relative'>
          <div className='cover grid place-items-center absolute inset-0 z-10 bg-black/50 opacity-0 hover:opacity-100 cursor-zoom-in'>
            <ZoomIn size={36} />
          </div>
          <Image
            alt={alt}
            src={src}
            width={360}
            height={180}
            className='w-full h-[180px] object-cover'
          />
        </figure>
      </PhotoView>
    </PhotoProvider>
  );
};

export default PhotoViewer;
