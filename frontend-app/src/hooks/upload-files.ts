import { UploadType } from "@archetypes/archtype"
import { RefObject } from "react"

export const UploadHandler = ({ type, fileInputRef }: { type: UploadType, fileInputRef: RefObject<HTMLInputElement | null> }) => {
    if (!fileInputRef.current) return;
    switch (type) {
        case UploadType.File:
            fileInputRef.current.removeAttribute("accept");
            fileInputRef.current.removeAttribute("Capture");
            break;
        case UploadType.Camera:
            fileInputRef.current.setAttribute("accept", "image/*");
            fileInputRef.current.setAttribute("capture", "environment");// open camera
            break;
        case UploadType.Gallery:
            fileInputRef.current.setAttribute("accept", "image");
            fileInputRef.current.removeAttribute("capture"); // open gallery
            break;
    }
    fileInputRef.current.click();

    return {

    }
}