
'use server'

import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { signIn  , signOut} from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"



export const login = async (values : z.infer<typeof LoginSchema> )=>{
   
    
    const validatedFields = LoginSchema.safeParse(values)
   

    if(!validatedFields.success) {
        return {error : 'Invalid fields😢'}
    }

    const {email , password } = validatedFields.data

    try {
        
      await signIn("credentials" , {
            email , password , redirectTo : DEFAULT_LOGIN_REDIRECT
        })
        console.log("hiiiii")
  
        return { success : "login success"}
    } catch (error : any) {
        console.log(" hey , i am back")
        console.log(error)
       

        if(error instanceof AuthError) {
            
            switch (error.type) {
                case "CredentialsSignin" :
                    return {error : "Invalid credentials" }
                default:
                    return {error : "Something went wrong" }

            }
        
        }

            return {error : error.Error}
   
        
    }


}