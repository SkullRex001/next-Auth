import { Navbar } from "@/components/auth/navbar"
import React from "react"

interface Props {
    children : React.ReactNode
}

export default function ({children}: Props){

    return(
        <>
        <div className=" h-[100vh] w-[100vw] flex flex-col gap-y-10 items-center justify-center bg-slate-800 "> 
        <Navbar/>
        {children}
        </div>
        </>
    )

}