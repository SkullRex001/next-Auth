import prisma from "@/lib/db";

export const getAccoundByUserId = async (userId : string)=>{

    try {

        const account = await prisma.account.findFirst({
            where : {
                userId
            }
        })

        return account
        
    } catch (error) {
       throw new Error("Something went wrong")
        
    }

}