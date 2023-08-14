import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  memo,
} from "react";
import Modal from "../components/Modal";

interface UseModalProps {
  defaultIsOpen?: boolean;
}

interface ModalContextData {
  openModal: () => void;
  closeModal: () => void;
  ModalWrapper: React.FC<any>;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const useModal = ({ defaultIsOpen = false }: UseModalProps = {}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const ModalWrapper = useMemo(() => {
    const ModalWrapperComponent: React.FC<any> = ({ title, children }) => {
      return (
        <Modal isOpen={isOpen} onClose={closeModal} title={title}>
          {children}
        </Modal>
      );
    };

    return memo(ModalWrapperComponent);
  }, [isOpen, closeModal]);

  return {
    openModal,
    closeModal,
    ModalWrapper,
  };
};

const useModalContext = () => useContext(ModalContext);

export { useModal, useModalContext, ModalContext };
