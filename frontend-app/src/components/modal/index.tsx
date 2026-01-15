import { Button } from "@components/Button";
import { FC } from "react";
import { createPortal } from "react-dom";
import "./model.scss";
import { CloseIcon } from "@components/icons";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const container = document.querySelector("#ul-modal");
  if (!isOpen || !container) return null;

  return createPortal(
    <>
      <div className="modal-wrapper fixed z-[99]" />
      <div className="modal-content fixed z-[100] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-[20px] py-[10px]">
        {onClose && (
            <Button onClick={onClose} variant="transparent" className="border-0 absolute right-[0px]">
            <CloseIcon size={10} color={"#000"} />
          </Button>
        )}
        {children}
      </div>
    </>,
    container
  );
};
