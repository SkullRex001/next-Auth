"use client"

import { SessionProvider } from "next-auth/react";

// import { auth } from "@/auth";
import React from "react";

interface Children {

    children: React.ReactNode

}

export const Provider = ({ children }: Children) => {

    // const session = await auth()

    return (
        <>
        <SessionProvider>
            {children}
        </SessionProvider>


        </>

    )


}