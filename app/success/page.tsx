"use client"
import { useSession } from "next-auth/react"
export default function Page(){
    const {data:session, status} = useSession()
    console.log(session, status);


    if(status === "loading") return <div>Loading...</div>

    if(status === "unauthenticated") return <div>Unauthenticated</div>

    return <div>Logged In</div>
}