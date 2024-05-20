import prisma from "./db";
import { v4 } from "uuid";
import crypto from "crypto"

import { getVerificationTokenByEmail } from "@/data/verification-token";

import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email : string)=>{
    const token = crypto.randomInt(100000 ,1000000 ).toString()
    //must be 15 minutes
    const expires = new Date(new Date().getTime() + 5*60*1000)

    const existingToken = await getTwoFactorTokenByEmail(email)

    if(existingToken) {
        await prisma.twoFactorToken.delete({
            where : {
                id : existingToken.id
            }
        })
    }

    const twoFactorToken = await prisma.twoFactorToken.create({
        data : {
            email ,
            token,
            expires
        }
    })

    return twoFactorToken



}

export const generateVerificationToken = async (email : string)=>{
    const token = v4()

    const expires = new Date(new Date().getTime() + 3600*1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken) {
        await prisma.verificationToken.delete({
            where : {
                id : existingToken.id
            }
        })
    }

    const verificationToken = await prisma.verificationToken.create({
        data : {
            email , token , expires
        }
    })
    console.log("varification token craeted" , verificationToken)
    
    return verificationToken;
}


export const generatePasswordResetToken = async (email : string)=>{
    const token = v4()
    const expires = new Date(new Date().getTime() + 3600*1000)

    const existingToken = await getPasswordResetTokenByEmail(email)

    if(existingToken) {
        await prisma.resetPasswordToken.delete({
            where : {
                id : existingToken.id
            }
        })
    }

    const passwordResetToken = await prisma.resetPasswordToken.create({
        data : {
            email, 
            token,
            expires
        }
    })

    return passwordResetToken
    
}