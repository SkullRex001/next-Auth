"use server"

import prisma from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"


export const newVerification = async (token : string)=>{
    const existingToken = await getVerificationTokenByToken(token)

    console.log(existingToken)
    

    if(!existingToken){

        return {error : "Verification failed"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if(hasExpired){
        return {error : "Token has expired!"}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if(!existingUser) {
        return {error : "Email does not exist"}
    }

    prisma.user.update({
        where : {id : existingUser.id},
        data : {
            emailVerified : new Date(),
            email : existingToken.email
            //upate email feature
        }
    }).catch((error)=>{
        return {error : "Something Went Wrong"}
    })

    prisma.verificationToken.delete({
        where : { id :  existingToken.id
        }
    }).catch((error)=>{
        console.log(error)
    })


    return {success : "Email Verified"} 






}