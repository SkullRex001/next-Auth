"use client"

import { CardWrapper } from "@/components/auth/card-wrapper"
import * as z from 'zod'
import { ResetPasswordSchema } from "@/schemas"
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


import { useRouter } from "next/navigation"
import { reset } from "@/actions/reset"


export const ResetPasswrodForm = () => {

    const router = useRouter()



    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")


 

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        defaultValues: {
            email: ""
        },

        resolver: zodResolver(ResetPasswordSchema)

    })

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {

        setError("")
        setSuccess("")

        startTransition(() => {
            reset(values).then((data : any) => {
                setError(data?.error);
                setSuccess(data?.success)

        
            }).catch((err) => {
     
                setError(err.message)   
              
            })
        })

    }


    return (
        <CardWrapper headerLable="Forgot your password?" backButtonLabel="Back to login" backButtonHref="/auth/login" >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                    <div className=" space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormLabel>
                                        <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="jhon@example.com"
                                            type="email"
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
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}