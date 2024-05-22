"use server"

import * as z from "zod"
import { unstable_update } from "@/auth"
import prisma from "@/lib/db"
import { SettingsSchema } from "@/schemas"
import bcrypt from 'bcryptjs'
import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"

export const settings = async (values: z.infer<typeof SettingsSchema>) => {

    try {
        const user = await currentUser()
        if (!user) {
            return { error: "Unauthorized" }
        }

        const dbUser = await getUserById(user.id)

        if (!dbUser) {
            return { error: "Unauthorized" }
        }

        if (user.isOAuth) {
            values.email = undefined
            values.password = undefined
            values.newPassword = undefined
            values.isTwoFactorEnabled = undefined
        }

        if (values.email && (values.email !== user.email)) {
            const existingUser = await getUserByEmail(values.email)

            if (existingUser && existingUser.id !== user.id) {
                return { error: "Email already in use" }

            }

            const verificationToken = await generateVerificationToken(values.email)

          await sendVerificationEmail(verificationToken.email, verificationToken.token)

            return { success: `verification email sent to ${values.email} ` }

        }

        if (values.password && !values.newPassword) {
            return { error: "Please enter new pssword" }
        }

        if (values.newPassword && !values.newPassword) {
            return { error: "Please enter the old password" }
        }

        if (dbUser.password) {

            if (values.password && values.newPassword) {
                const passwordMatch = await bcrypt.compare(values.password, dbUser.password)

                if(!passwordMatch){
                    return {error : "Incorrect passowrd"}
                }

                const hashedPassword = await bcrypt.hash(values.newPassword , 10)

                values.password = hashedPassword
                values.newPassword = undefined
            }

        }


      const updateduser =   await prisma.user.update({
            where: {
                id: dbUser.id
            },
            data: {
                ...values
            }
        })
     unstable_update({
        user : {
            name : updateduser.name,
            email : updateduser.email,
            isTwoFactorEnabled : updateduser.isTwoFactorEnabled,
            role : updateduser.role
        }
     })

        return { success: "Settings Updated" }

    } catch (error) {
        return { error: 'Something Went Wrong' }

    }


}

