
import { getUserById } from "./data/user"
import NextAuth , {DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"

// declare module "@auth/core" {
//     interface Session {
//         user : {
//             role : "ADMIN" | "GUEST"
//         } & DefaultSession["user"]
//     }
// }

import authConfig from "@/auth.config"
import prisma from "@/lib/db"
import { getAccoundByUserId } from "./data/account"
export const  {
    handlers , auth , signIn , signOut , unstable_update
} = NextAuth({
    pages : {
        signIn : "/auth/login",
        error : "/auth/error"
    },
    events : {
        async linkAccount({user}){
            await prisma.user.update({
                where : {
                    id : user.id
                },
                data : {
                    emailVerified : new Date()
                }

            })
        }
    },
    callbacks : {
        async signIn({user , account}){
            console.log("hii")
            if(account?.provider !== "credentials") return true
            //take a look at it later , i have fixed type error 
            //but i don't know how
            if(!user?.id) {
                return false;
            }

             const existingUser = await getUserById(user.id)
             if(!existingUser?.emailVerified) {
                return false}

                console.log(existingUser)

             if(existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                console.log(twoFactorConfirmation)

                if(!twoFactorConfirmation) return false

                await prisma.twoFactorConfirmation.delete({
                    where : {
                        id : twoFactorConfirmation.id
                    }
                })
             }   

            return true

        },
        async session({token , session}){
            if(token.sub && session.user){
                session.user.id = token.sub
            }
            if(token.role && session.user){
                session.user.role = token.role
                //fixed by types/next-auth.d.ts
             
            }
            if(session.user){
                session.user.isTwoFactorEnabled  = token.isTwoFactorEnabled 
                //fixed by types/next-auth.d.ts
             
            }

            if(session.user){
                session.user.name = token.name
                session.user.email = token.email as string
                session.user.isOAuth = token.isOAuth as boolean
                //settigs update
            }
       
            return session

        },
        async jwt({token}){

            console.log("jwt:-" , token)
            if(!token.sub) return token
            const existingUser = await getUserById(token.sub)

            if(!existingUser) return token

            const existingAccount = await getAccoundByUserId(existingUser.id)
            
            token.isOAuth = !!existingAccount
            token.name = existingUser.name
            token.email = existingUser.email
            token.role = existingUser.role
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
            return token

        }
    },
    adapter : PrismaAdapter(prisma),
    session : {strategy : 'jwt'},
    ...authConfig ,    
}) 