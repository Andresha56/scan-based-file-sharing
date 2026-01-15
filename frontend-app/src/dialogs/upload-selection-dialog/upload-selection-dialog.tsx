import { FC } from "react"
import { UploadSelection } from ".";
import { UploadType } from "@archetypes/archtype";

interface UploadSelectionDialogProps {
    containerClassName?: string;
    isOpen: boolean;
    onClose: () => void;
    onClick: (type: UploadType) => void;
}
export const UploadSelectionDialog: FC<UploadSelectionDialogProps> = ({
    containerClassName,
    isOpen,
    onClick,
    onClose,
}) => {
    return (
        <UploadSelection
            isOpen={isOpen}
            onClick={onClick}
            onClose={onClose}
            containerClassName={containerClassName}
        />
    )
}