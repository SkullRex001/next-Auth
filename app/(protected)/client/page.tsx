"use client"

import { UserInfo } from "@/components/user-info"
import { useCurrentUser } from "@/hooks/user-current-user"

 export default function (){

    const user = useCurrentUser() //my sustom hook
    return(
        <div>
           <UserInfo label="👤Client Component"
           user={user}/>
        </div>
    )
}