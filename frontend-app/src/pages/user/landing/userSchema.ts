import * as z from "zod";
export const UserSchema = z.object({
    _id:z.string().optional(),
    name: z.string({ message: "Name is required." })
        .min(3, { message: "Name must be atleast 3 characters long" }),
    room: z.object({
        _id: z.string().optional(),
    }).optional(),
});
export type UserSchematype = z.infer<typeof UserSchema>;
