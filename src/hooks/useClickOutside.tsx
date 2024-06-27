import { useEffect } from 'react';

const useClickOutside = (ref: React.RefObject<HTMLElement>, onClickOutside: Function) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (el.contains(target)) return;
      onClickOutside?.();
    };

    window.addEventListener('click', clickHandler);

    return () => window.removeEventListener('click', clickHandler);
  }, []);
};

export default useClickOutside;
