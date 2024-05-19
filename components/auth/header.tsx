import { poppins } from "@/app/font";

import { cn } from "@/lib/utils";

interface HeaderProps {
    label : string
}


export const Header = ({label} : HeaderProps)=>{
    return (
        <div className=" w-full flex flex-col gap-y-4 items-center">
            <h1 className={cn("text-3xl font-semibold" , poppins.className)}>
                🔐Auth
            </h1>
            <p className=" text-gray-400">
                {label}
            </p>
        </div>
    )

}