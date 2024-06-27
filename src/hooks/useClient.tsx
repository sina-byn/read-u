import { useState, useEffect } from 'react';

const useClient = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export default useClient;
