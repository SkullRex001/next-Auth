import prisma from "@/lib/db";

export const getPasswordResetTokenByToken = async (token : string)=>{
    try {
        const passwordResetToken = await prisma.resetPasswordToken.findUnique({
            where : {
                token
            }
        })

        return passwordResetToken
    } catch (error) {

        return null
        
        
    }
}
export const getPasswordResetTokenByEmail = async (email : string)=>{
    try {
        const passwordResetToken = await prisma.resetPasswordToken.findFirst({
            where : {
                email
            }
        })

        return passwordResetToken
    } catch (error) {

        return null

        
    }
}