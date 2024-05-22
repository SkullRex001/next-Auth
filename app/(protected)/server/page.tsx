import { UserInfo } from "@/components/user-info"
import { currentUser } from "@/lib/auth"

 export default async function (){

    const user = await currentUser() 
    return(
        <div>
           <UserInfo label="🖥️Server Component"
           user={user}/>
        </div>
    )
}