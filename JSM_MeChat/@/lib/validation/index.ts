import * as z from "zod"
 
export const SignUpValidationSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters long",
  }).max(50),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const SignInValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const PostValidationSchema = z.object({
  caption: z.string().min(2).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(5).max(100),
  tags: z.string(),
});