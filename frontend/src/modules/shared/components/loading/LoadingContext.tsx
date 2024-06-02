// LoadingContext.js
import React, {ReactElement, createContext, useCallback, useState} from 'react';

// Define a type for the context
export type LoadingContextType =
  | {
      loading: boolean;
      startLoading: () => void;
      stopLoading: () => void;
    }
  | undefined;

// Use the type when creating the context
export const LoadingContext = createContext<LoadingContextType>(undefined);

// Specify the type of the children prop
export const LoadingProvider = ({
  children
}: {
  children: React.ReactNode;
}): ReactElement => {
  const [loading, setLoading] = useState(false);

  const startLoading = useCallback((): void => setLoading(true), []);
  const stopLoading = useCallback((): void => setLoading(false), []);

  return (
    <LoadingContext.Provider value={{loading, startLoading, stopLoading}}>
      {children}
    </LoadingContext.Provider>
  );
};
