
'use server'
//for future use, if i tried to logout via  server actions

import { signOut } from "@/auth"



export const logout = async ()=>{
    await signOut()
 
 
}