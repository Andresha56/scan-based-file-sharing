import { MessageTypeEnum } from "@archetypes/archtype";
import { z } from "zod";


export const MessagePayloadSchema = z.object({
  message: z.string().optional(),
  url: z.string().optional(),
  fileName: z.string().optional(),
  fileSize: z.number().optional(),
});

export const MessageSchema = z.object({
  _id: z.string().optional(),
  conversationId: z.string().optional(),
  senderId: z.string().optional(),
  receiverId: z.string().optional(),
  type: z.enum(MessageTypeEnum).optional(),
  payload: MessagePayloadSchema.optional(),
  createdAt: z.string().or(z.date()).optional(),
});
export type MessageSchemaType = z.infer<typeof MessageSchema>;
export type MessagePayload = z.infer<typeof MessagePayloadSchema>;  