import { FC } from "react";
import { CameraIcon, FileUploadIcon, GalleryIcon } from "@components/icons";
import { Button } from "@components/Button";
import { UploadType } from "@archetypes/archtype";

interface UploadSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: (type: UploadType) => void;
  containerClassName?: string;
}
export const UploadSelection: FC<UploadSelectionProps> = ({
  isOpen,
  onClick,
  containerClassName,
}) => {
  if (!isOpen) return null;

  return (
    <div className={`flex gap-4 p-4 ${containerClassName}`}>
      <Button onClick={() => onClick(UploadType.File)}>
        <FileUploadIcon color="white" size={40} />
      </Button>

      <Button onClick={() => onClick(UploadType.Camera)}>
        <CameraIcon color="white" size={40} />
      </Button>

      <Button onClick={() => onClick(UploadType.Gallery)}>
        <GalleryIcon color="white" size={40} />
      </Button>
    </div>
  );
};
