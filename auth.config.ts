import Credentials from "next-auth/providers/credentials"

import { LoginSchema } from "@/schemas"

import type { NextAuthConfig } from "next-auth"

import bcrypt from 'bcryptjs'

import { getUserByEmail } from "./data/user"
 
export default { providers: [
    Credentials({
         authorize : async (credentials)=>{
            const validatedFields = LoginSchema.safeParse(credentials)

            if(validatedFields.success){
                const {email , password} = validatedFields.data

                const user = await getUserByEmail(email)

                if(!user || !user.password) return null 

                const passwordsMatch = await bcrypt.compare(
                    password , user.password    
                )

                if(passwordsMatch) {
                    console.log(" user is successfully retuned")
                    return user}
            }

            return null
        }
    })

] } satisfies NextAuthConfig
