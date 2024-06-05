import React, {ReactElement, createContext, useState} from 'react';

export interface ModalProps {
  hideModal: () => void;
  onSubmit?: (formData?: any) => void;
  onReject?: (formData?: any) => void;
  data?: any;
}

export interface ModalContextValue {
  showModal: (
    ModalComponent: React.ComponentType<ModalProps>,
    onSubmit?: (formData: Record<string, string>) => void,
    onReject?: (formData: Record<string, string>) => void,
    data?: any
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
      onReject?: (formData: Record<string, string>) => void;
      data?: any;
    }[]
  >([]);

  const showModal = (
    ModalComponent: React.ComponentType<ModalProps>,
    onSubmit?: (formData: Record<string, string>) => void,
    onReject?: (formData: Record<string, string>) => void,
    data?: any
  ): void => {
    setModals(prevModals => [
      ...prevModals,
      {ModalComponent, onSubmit, onReject, data}
    ]);
  };

  const hideModal = (): void => {
    setModals(modals.slice(0, -1));
  };
  return (
    <ModalContext.Provider value={{showModal, hideModal}}>
      {children}
      {modals.map(({ModalComponent, onSubmit, onReject, data}, index) => (
        <ModalComponent
          key={index}
          hideModal={hideModal}
          onSubmit={onSubmit}
          onReject={onReject}
          data={data}
        />
      ))}
    </ModalContext.Provider>
  );
};
