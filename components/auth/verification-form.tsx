"use client"

import { CardWrapper } from "./card-wrapper"
import {RingLoader} from 'react-spinners'
import { useSearchParams } from "next/navigation"
import { useCallback , useEffect , useState} from "react"
import { newVerification } from "@/actions/new-verification"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"


export const NewVerificationForm= ()=>{


    const [error , setError] = useState<string| undefined>()

    const [success , setSuccess] = useState<string | undefined>()


    const searchParams = useSearchParams()
    const token = searchParams.get("token") 

    const onSubmit = useCallback(()=>{

        if(!token){
            setError("Missing Token")
            return
        }
       newVerification(token).then((data)=>{
        setSuccess(data.success)
        setError(data.error)
       }).catch((err)=>{
        setError("Something went wrong")
        console.log(err)
       })
    } ,[token])

    useEffect(()=>{

        onSubmit()

    }, [onSubmit])

    return (
        <>
        <CardWrapper headerLable="Confirm your verification" backButtonLabel="Back to login" backButtonHref="/auth/login">
            <div className=" flex items-center w-full justify-center">
                {
                    !success && !error &&  <RingLoader/>

                }

                <FormSuccess message={success}/>
                <FormError message={error}/>
               
            </div>


        </CardWrapper>
        
        </>
    )
}