import React, { useEffect, useState } from 'react';
import { ReactNativeRecoilPersist } from './';

type Props = {
  store: ReactNativeRecoilPersist;
  fallback?: React.ReactNode;
  onInit?: () => void;
};

export const ReactNativeRecoilPersistGate: React.FC<Props> = ({
  store,
  children,
  fallback,
  onInit,
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    store.init().then(() => {
      setHasLoaded(true);
      onInit && onInit();
    });
  }, []);

  return <>{hasLoaded ? children : fallback || null}</>;
};
