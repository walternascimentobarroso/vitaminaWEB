import { ModalContext, useModal } from "../hooks/useModal";

const ModalProvider: React.FC = ({ children }: any) => {
  const modal = useModal();

  return (
    <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
