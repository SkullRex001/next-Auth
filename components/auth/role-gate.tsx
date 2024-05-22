"use client"

import { useCurrentRole } from "@/hooks/user-current-role"
import { FormError } from "../form-error"
import React from "react"

type UserRole = "ADMIN" | "USER"

  interface RoleGateProps {
    children : React.ReactNode,
    allowedRole : UserRole
  }

  export const RoleGate = ({
    children ,  allowedRole
  } : RoleGateProps) =>{

    const role = useCurrentRole()

    if(role !== allowedRole) {
        return(
            <>
            <FormError message="You do not have permission to view this content"/>
            </>
        )
    }


    return (
        <>
        {children}
        </>
    )


  }