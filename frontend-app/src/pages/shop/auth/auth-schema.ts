import * as z from "zod";
export const AuthSchema = z.object({
    shopName: z.string({message:"Shop name is required."}),
  password: z.string({ message: "Password is required" })
    .min(3, { message: "Password must be at least 3 characters long" }),
});
export type AuthFormData = z.infer<typeof AuthSchema>;
z