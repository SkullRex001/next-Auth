"use server"

import * as z from "zod"
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs"

import prisma from "@/lib/db"

import { getUserByEmail } from "@/data/user"




export const register = async (values : z.infer<typeof RegisterSchema> )=>{
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error : 'Invalid fields😢'}
    }

    const { email , password , name} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    const hashedPassword = await bcrypt.hash(password , 10)


    if(existingUser){
        return { error : "Email is already in use"}
    }

    await prisma.user.create({
        data : {
            name, 
            email,
            password : hashedPassword
        }
    })


   // TO Send Varifiaction email

    // return {success : 'Email sent😊'}

    return {success : 'User Created'}

}