"use client"

import { CardWrapper } from "@/components/auth/card-wrapper"
import * as z from 'zod'
import { useSearchParams } from "next/navigation"
import { NewPasswordSchema } from "@/schemas"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

import { reset } from "@/actions/reset"
import { newPassword } from "@/actions/new-password"


export const NewPasswrodForm = () => {

    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")


 

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        defaultValues: {
            password: ""
        },

        resolver: zodResolver(NewPasswordSchema)

    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {

        setError("")
        setSuccess("")

        startTransition(() => {
            newPassword(values , token).then((data : any) => {
                setError(data?.error);
                setSuccess(data?.success)

        
            }).catch((err) => {
     
                setError(err.message)   
              
            })
        })

    }

    return (
        <CardWrapper headerLable="Enter new password" backButtonLabel="Back to login" backButtonHref="/auth/login" >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                    <div className=" space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Pssword</FormLabel>
                                    <FormLabel>
                                        <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="pasword"
                                            disabled={isPending}
                                        />
                                        </FormControl>
                                    </FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" disabled={isPending}>
                       Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}