// LoadingUtils.tsx
import {useContext} from 'react';
import {LoadingContext, LoadingContextType} from './LoadingContext';

export const useLoading = (): LoadingContextType | undefined =>
  useContext(LoadingContext);

export const useStartLoading = (): (() => void) | undefined => {
  const context = useLoading();
  return context?.startLoading;
};

export const useStopLoading = (): (() => void) | undefined => {
  const context = useLoading();
  return context?.stopLoading;
};
