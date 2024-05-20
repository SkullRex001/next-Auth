"use server"

import * as z from "zod"
import bcrypt from 'bcryptjs'

import { NewPasswordSchema } from "@/schemas"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
import prisma from "@/lib/db"

export const newPassword = async (values : z.infer<typeof NewPasswordSchema> , token? : string |null)=>{

    if(!token) {
        return {error : "Missing token"}
    }

    const validatedFields = NewPasswordSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error : "Invalid fields "}
    }

    const {password} = validatedFields.data
    
    try {
        const exisitingToken = await getPasswordResetTokenByToken(token)

        if(!exisitingToken) {
            return { error : "Invalid token!" }
        }
    
        const hasExpired = new Date(exisitingToken.expires) < new Date()
    
        if( hasExpired) {
            return {error : "Token has expired"}
        }
    
        const exisitingUser = await getUserByEmail(exisitingToken.email)

        //check id used has entered old password

      
        const hashedPassword = await bcrypt.hash(password , 10)

        
        await prisma.user.update({
            where : {
                id : exisitingUser?.id
            },
            data :  {
                password : hashedPassword
            }
    
        })

        prisma.resetPasswordToken.delete({
            where : {
                id : exisitingToken.id
            }
        }).catch((err)=>{
            console.log(err)
        })

        return { success : "Password Update Successful"}
    
        
    } catch (error) {
        return {error : "Something went wrong"}
        
    }

  


}
