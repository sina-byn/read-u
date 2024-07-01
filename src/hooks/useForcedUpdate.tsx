import { useState } from 'react';

// * types
type UseForcedUpdateReturn = [number, Function];

const useForcedUpdate = (): UseForcedUpdateReturn => {
  const [state, setState] = useState<number>(0);
  const forceUpdate = () => setState(prev => (prev === 0 ? 1 : 0));

  return [state, forceUpdate];
};

export default useForcedUpdate;
