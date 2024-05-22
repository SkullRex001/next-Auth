import Credentials from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { LoginSchema } from "@/schemas"

import type { NextAuthConfig } from "next-auth"

import bcrypt from 'bcryptjs'

import { getUserByEmail } from "./data/user"
 
export default { providers: [
    GoogleProvider({
        clientId : process.env.AUTH_GOOGLE_ID,
        clientSecret : process.env.AUTH_GOOGLE_SECRET

    }),
    GitHubProvider({
        clientId : process.env.AUTH_GITHUB_ID,
        clientSecret : process.env.AUTH_GITHUB_SECRET
    }),
    Credentials({
         authorize : async (credentials): Promise<any> =>{
            //fix this type error properly

            const validatedFields = LoginSchema.safeParse(credentials)

            if(validatedFields.success){
                const {email , password} = validatedFields.data

                const user = await getUserByEmail(email)

                if(!user || !user.password) return null 

                const passwordsMatch = await bcrypt.compare(
                    password , user.password    
                )

                if(passwordsMatch) {
                    return user}
            }

            return null
        }
    })

] } satisfies NextAuthConfig
