"use client"
import { BackButton } from "@/components/auth/back-button"
import { ReactNode } from "react"
import { Card , CardContent , CardFooter , CardHeader } from "@/components/ui/card"

interface CardWrapperProps {
    children : ReactNode,
    headerLable : string,
    backButtonLabel : string,
    backButtonHref :string,
    showSocial? : boolean

}

import { Social } from "@/components/auth/social"

import { Header } from "@/components/auth/header"

export const CardWrapper = ({
    children ,
    headerLable,
    backButtonLabel,
    backButtonHref,
    showSocial
} : CardWrapperProps) =>{

    return (
        <Card className=" w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLable}/>
            </CardHeader>
            <CardContent>   
            {children}
            </CardContent>
            {showSocial && (<CardContent><Social/> </CardContent>)}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref}/>
            </CardFooter>

        </Card>
    )
}