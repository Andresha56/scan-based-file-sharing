import { FC } from "react";
import { Controller } from "react-hook-form";
import { TextBox } from "@components/Text-box";
import { Button } from "@components/Button";
import { FileUploadIcon, PaperPlaneIcon } from "@components/icons";
import { UploadSelectionDialog } from "@dialogs/upload-selection-dialog/upload-selection-dialog";
import { useOutsideClick } from "@hooks/use-outside-click";
import { useMessageController } from "@hooks/use-message-controller";
import "./user-dashboad.scss";
import { MessageTypeEnum } from "@archetypes/archtype";

const UserDashBoard: FC = () => {

   const searchParams = new URLSearchParams(location.search);
  const senderId = searchParams.get("senderId") || "";
  const receiverId = searchParams.get("receiverId") || "";
  const roomId = searchParams.get("roomId") || "";

  const {
    form,
    fileInputRef,
    isChooseUploadType,
    setIsChooseUploadType,
    handleFileUpload,
    onSubmit,
  } = useMessageController({
    senderId,
    receiverId,
    roomId,
  });

  const { control, handleSubmit, formState: { errors } ,setValue} = form;
  const ref = useOutsideClick<HTMLDivElement>(() => {
    setIsChooseUploadType(false);
  });

  return (
    <section className="user-dashboard-wrapper">
      <div className="container flex flex-col" ref={ref}>
        {isChooseUploadType && (
          <UploadSelectionDialog
            isOpen
            onClose={() => setIsChooseUploadType(false)}
            onClick={handleFileUpload}
            containerClassName="upload-dialog"
          />
        )}  

        <form
          className="flex items-center justify-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Button type="button" onClick={() => setIsChooseUploadType(true)}>
            <FileUploadIcon size="20" color="black" />
          </Button>

          <TextBox
            type="file"
            ref={fileInputRef}
            containerClassName="hidden"
          />

          <Controller
            name="payload.message"
            control={control}
            render={({ field }) => (
              <TextBox
                value={field.value}
                onChange={(value) => {
                  setValue("type", MessageTypeEnum.Text);
                  field.onChange(value);
                }}
                placeholder="Enter your message"
                containerClassName="w-80 mr-10"
              />
            )}
          />

          <Button type="submit" variant="primary">
            <PaperPlaneIcon />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default UserDashBoard;
