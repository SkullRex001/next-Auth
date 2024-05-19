import { ReactNode } from "react";


export default function ({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <>
        <div className=" h-full flex items-center justify-center  bg-slate-800"> 
            {children}
        </div>
        </>
    )
}

