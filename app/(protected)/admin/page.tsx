"use client"
import {Card , CardContent, CardHeader} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { RoleGate } from "@/components/auth/role-gate"
import { FormSuccess } from "@/components/form-success"
import { toast } from "sonner"
import { admin } from "@/actions/admin"




export default function (){
    const onApiRouteClick = ()=>{
        fetch("/adminonly").then((data)=>{
            if(data.ok){
              return toast.success("Allowed API Routes")
            }
            else {
               return toast.error("Forbidden API Route!")
            }
        }).catch((err)=>{
            console.log("Something Went Wrong")
        })
    }

    const onServerActionClick = ()=> {
        admin().then((data)=>{
            if(data.error){
               return toast.error(data.error)
            }
            else{
                return toast.success(data.success)
            }


        })
    }
    
    return (
        <>
        <Card className=" w-[600px]">
            <CardHeader>
                <p className=" text-xl font-semibold text-center">
                    🔑Admin
                </p>
            </CardHeader>
            <CardContent className=" space-y-4">
                <RoleGate allowedRole={"ADMIN"}>
                    <FormSuccess message="You are allowed to see this content"/>
                </RoleGate>

                <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className=" text-sm font-medium">Admin-only API Route</p>
                    <Button onClick={()=>{
                        onApiRouteClick()
                    }}>Click to test</Button>
                </div>

                <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className=" text-sm font-medium">Admin-only Server Action</p>
                    <Button onClick={()=>{
                        onServerActionClick()
                    }}>Click to test</Button>
                </div>

            </CardContent>
        </Card>
        
        </>
    )
}