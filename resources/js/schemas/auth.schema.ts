import { MINIMUM_PASSWORD_CHARACTERS } from "@/constants/config";
import { VALIDATION_MESSAGES } from "@/constants/validateMessage";
import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, VALIDATION_MESSAGES.REQUIRED_EMAIL)
        .email(VALIDATION_MESSAGES.INVALID_EMAIL),

    password: z
        .string()
        .min(1, VALIDATION_MESSAGES.REQUIRED_PASSWORD)
        .min(
            MINIMUM_PASSWORD_CHARACTERS,
            VALIDATION_MESSAGES.MINIMUM_PASSWORD_CHARACTERS,
        ),
});

export const registerSchema = z.object({
    name: z.string().min(2, VALIDATION_MESSAGES.MINIMUM_USERNAM_CHARACTERS),
    email: z
        .string()
        .min(1, VALIDATION_MESSAGES.REQUIRED_EMAIL)
        .email(VALIDATION_MESSAGES.INVALID_EMAIL),
    password: z
        .string()
        .min(1, VALIDATION_MESSAGES.REQUIRED_PASSWORD)
        .min(
            MINIMUM_PASSWORD_CHARACTERS,
            VALIDATION_MESSAGES.MINIMUM_PASSWORD_CHARACTERS,
        ),
});
