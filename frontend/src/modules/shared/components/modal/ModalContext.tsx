import React, {ReactElement, createContext, useState} from 'react';

export interface ModalProps {
  hideModal: () => void;
  onSubmit?: (formData: any) => void;
}

export interface ModalContextValue {
  showModal: (
    ModalComponent: React.ComponentType<ModalProps>,
    onSubmit?: (formData: Record<string, string>) => void
  ) => void;
  hideModal: () => void;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ({children}: ModalProviderProps): ReactElement => {
  const [modals, setModals] = useState<
    {
      ModalComponent: React.ComponentType<ModalProps>;
      onSubmit?: (formData: Record<string, string>) => void;
    }[]
  >([]);

  const showModal = (
    ModalComponent: React.ComponentType<ModalProps>,
    onSubmit?: (formData: Record<string, string>) => void
  ): void => {
    setModals(prevModals => [...prevModals, {ModalComponent, onSubmit}]);
  };

  const hideModal = (): void => {
    setModals(modals.slice(0, -1));
  };
  return (
    <ModalContext.Provider value={{showModal, hideModal}}>
      {children}
      {modals.map(({ModalComponent, onSubmit}, index) => (
        <ModalComponent key={index} hideModal={hideModal} onSubmit={onSubmit} />
      ))}
    </ModalContext.Provider>
  );
};
