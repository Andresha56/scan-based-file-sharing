import { useCallback, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MessageSchema,
  MessageSchemaType,
} from "@pages/user/user-dash-boad/user-dashboard-schema";
import { UploadType } from "@archetypes/archtype";
import { UploadHandler } from "@hooks/upload-files";
import { sendMessage } from "@query/index";
import { useSocket } from "@contexts/web-socket-context";

export const useMessageController = ({
  senderId,
  receiverId,
  roomId
}:{senderId:string, receiverId:string, roomId:string}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const socket = useSocket();

  const [isChooseUploadType, setIsChooseUploadType] = useState(false);

  const form = useForm<MessageSchemaType>({
    defaultValues: { payload: { message: "" } },
    resolver: zodResolver(MessageSchema),
  });

  const handleFileUpload = useCallback((type: UploadType) => {
    UploadHandler({ type, fileInputRef });
  }, []);

  const onSubmit: SubmitHandler<MessageSchemaType> = useCallback(
  async (data) => {
    if (!data?.payload?.message?.trim()) return;

    socket.emit(
      "message:send",
      {
        roomId,
        receiverId,
        payload: data.payload,
      },
      (ack: any) => {
        if (ack?.success) {
          form.reset();
        }
      }
    );
  },
  [socket, roomId, receiverId, form]
);
  return {
    form,
    fileInputRef,
    isChooseUploadType,
    setIsChooseUploadType,
    handleFileUpload,
    onSubmit,
  };
};
