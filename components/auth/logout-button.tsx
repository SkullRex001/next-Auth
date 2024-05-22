import { logout } from "@/actions/logout";
// import { useRouter } from 'next/navigation';
import React from "react";
import { signOut } from "next-auth/react";

interface LogoutButtonProps {
    children? : React.ReactNode
}

export const LogOutButton = ({children} : LogoutButtonProps)=>{
    // const router = useRouter();

    const onClick = ()=>{
        signOut()
     
    }

    return(
        <span onClick={onClick} className=" cursor-pointer">
            {children}

        </span>
    )
    
    
}