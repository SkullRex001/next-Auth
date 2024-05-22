"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger

} from '@/components/ui/dropdown-menu'
import {
    Avatar,
    AvatarImage,
    AvatarFallback

} from '@/components/ui/avatar'
import { useCurrentUser } from '@/hooks/user-current-user'
import { FaUser } from 'react-icons/fa'
import { LogOutButton } from './logout-button'
import { ExitIcon } from '@radix-ui/react-icons'
export const UserButton = () => {
    const user = useCurrentUser()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className=' bg-slate-800'>
                        <FaUser className=' text-white' />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            
                    <DropdownMenuItem>
                    <LogOutButton>
                        <ExitIcon className='h-4 w-4 mr-2'/>
                        Logout
                        </LogOutButton>
                    </DropdownMenuItem>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}