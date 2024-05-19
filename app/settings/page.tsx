import { signOut  , auth} from "@/auth"
import { authRoutes } from "@/routes"


export default async function () {
    const session = await auth()
    return <>
    <h1>{JSON.stringify(session)}</h1>

    <form action={
        async ()=>{
            "use server"
            await signOut({
                redirectTo : authRoutes[0]
            })
        }
    }>
        <button type="submit">SignOut</button>
    </form>
    </>
    
}