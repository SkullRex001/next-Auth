"use server"

import * as z from 'zod';

import { ResetPasswordSchema } from '@/schemas';
import { sendResetPasswordEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';


export const reset = async (values : z.infer<typeof ResetPasswordSchema>)=>{
    
    const validatedFields = ResetPasswordSchema.safeParse(values)

    if(!validatedFields.success){
        return {error : "Invalid email"}
    }

    const {email} = validatedFields.data;

    const existingUser = await getUserByEmail(email)

    if(! existingUser) {
        return {error : "Email not found"}
    }

    try {
        const passwordResetToken = await generatePasswordResetToken(email)

        await sendResetPasswordEmail(passwordResetToken.email , passwordResetToken.token)

        return { success : "Reset email sent"}
        
    } catch (error) {

        console.log(error)

        return { error : "Something Went Wrong"}
        
    }


}