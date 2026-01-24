"use server"

import { SignUpFormError, validateSignUp } from "@/lib/validators/signUpValidator";
import { ActionResponse } from "@/types/action";
import { SignUpFormData } from "@/types/auth";

export async function signUpAction(data: SignUpFormData): Promise<ActionResponse<SignUpFormData, SignUpFormError>> {

    const { isValid, errors } = validateSignUp(data)

    if (!isValid) {
        return {
            success: false,
            errors,
            data
        }
    }

    console.log(data)

    await new Promise(resolve => setTimeout(resolve, 2000)) // delay 2s

    return { success: true, errors: {}, data }
}