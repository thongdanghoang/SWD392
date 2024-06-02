import {useContext} from 'react';
import {ModalContext, ModalContextValue} from './ModalContext.tsx';

export const useModal = (): ModalContextValue | null =>
  useContext(ModalContext);
