
'use server'

import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { signIn, signOut } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/data/user"
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens"
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import prisma from "@/lib/db"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"






export const login = async (values: z.infer<typeof LoginSchema>) => {


    const validatedFields = LoginSchema.safeParse(values)


    if (!validatedFields.success) {
        return { error: 'Invalid fields😢' }
    }

    const { email, password, code } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) throw new Error("Invalid credentials")


    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser?.email)

        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        //error handling left if mail faile to send
        // I think if verification token alredy exist and mail was sent , we must say please check email to conifrm rather than sending mail again and again and createing token again and again

        return { success: "Confirmation email sent" }
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {

        if (code) {
            //verify 2FA
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

            if(!twoFactorToken){
                throw new Error("Invalid Token")
            }

            if(twoFactorToken.token !== code){
                throw new Error("Invalid Token")
                
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date()

            if(hasExpired) {
                throw new Error("Code expired")
                
            }

            await prisma.twoFactorToken.delete({
                where : {id : twoFactorToken.id}
            })

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
            
            if(existingConfirmation){
                await prisma.twoFactorConfirmation.delete({
                    where : {
                        id : existingConfirmation.id
                    }
                })
            }

            await prisma.twoFactorConfirmation.create({
                data : {
                    userId: existingUser.id
                }
            })


        }

        else {
            //if empty token was sent
            const twoFactorTokenAlreadyStored = await getTwoFactorTokenByEmail(existingUser.email)

            if(twoFactorTokenAlreadyStored){

                throw new Error("Token is already sent")

            }

            const twoFactorToken = await generateTwoFactorToken(existingUser.email)
            await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
            return { twoFactor: true }

        }

    }





    try {

        await signIn("credentials", {
            email, password
        })

        return
    } catch (error: any) {

        if (error instanceof AuthError) {

            switch (error.type) {
                case "CredentialsSignin":
                    throw new Error("Invalid credentials")
                default:
                    throw new Error("Something Went Wrong")

            }

        }

        throw error


    }


}