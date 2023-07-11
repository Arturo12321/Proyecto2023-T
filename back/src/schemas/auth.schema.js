import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string({
            required_error: "Username is required",
    }),
    company_name: z
        .string({
            required_error: "Company is required",
        }),
    firstname: z
        .string({
            required_error: "Firstname is required",
    }),
    lastname: z
        .string({
            required_error: "Lastname is required",
    }),
    dni: z
        .string({
            required_error: "DNI is required",
    }),
    ruc: z
        .string({
            required_error: "RUC is required",
    }),
    address: z
    .string({
        required_error: "Address is required",
    }),
    email: z
    .string({
        required_error: "Email is required",
    })
    .email({
        message: "Invalid email",
    }),
    password: z
        .string({
            required_error:"Password is required",
        })
        .min(6, {
            message: "Password must be at least 6 characters",
    }),
});

export const loginSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
        })
        .email({
            message: "Invalid email",
    }),
    password: z
        .string({
            required_error:"Password is required",
        })
        .min(6, {
            message: "Password must be at least 6 characters",
    }),
});