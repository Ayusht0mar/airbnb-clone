import { auth } from "@/auth"
import Image from "next/image"
import { PiUserCircleDuotone } from "react-icons/pi"
 
export default async function UserAvatar() {
  const session = await auth()
  
  if (!session?.user) return null


  return (

    <div>

    {session ? 

        <div>
          <Image width={320} height={320} src={session.user.image ?? ''} alt="User Avatar" className="rounded-md"/>
        </div>
        :      
          <PiUserCircleDuotone onClick={() => {}}/>

    }

    </div>
  )
}