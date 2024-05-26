import {z} from 'zod';

export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "Username must be not more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special charactes")

export const signUpValidation= z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid Email Address'}),
    password: z.string().min(8, {message: 'Password must be atleast 6 character'})
})