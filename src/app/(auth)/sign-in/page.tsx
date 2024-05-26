"use client"
import { useSession, signIn, signOut } from 'next-auth/react'
export default function component(){
    const {data: session} = useSession()

    if(session){
        return(
            <>
                Sign in as {session.user.email} <br/>
                <button onClick={()=> signOut()}> Sign Out</button>
            </>
        )
    }


return(
    <>
        Not Signed in <br/>
        <button className='bg-orange-500 px-3 py-1 m-4 rounded' onClick={()=> signIn()}> Sign In</button>
    </>
)
}
