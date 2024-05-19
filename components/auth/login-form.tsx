"use client"

import { CardWrapper } from "@/components/auth/card-wrapper"
import * as z from 'zod'
import { LoginSchema } from "@/schemas"
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
import { login } from "@/actions/login"

export const LoginForm = () => {

    const [isPending , startTransition] = useTransition()
    const [error , setError] = useState<string | undefined>("")
    const [success , setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof LoginSchema>>({
        defaultValues: {
            email: "",
            password: ""
        },

        resolver: zodResolver(LoginSchema)

    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        
        setError("")
        setSuccess("")
        
        startTransition(()=>{
            login(values).then((data)=>{ 
                console.log(data)
                console.log("This is the data")

              setError(data.error)
             setSuccess(data.success)
            }).catch((err)=>{
                console.log(err)
            })
        })

    }


    return (
        <CardWrapper headerLable="Welcome back" backButtonLabel="Don't have an account" showSocial backButtonHref="/auth/register" >
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
                                        <Input
                                            {...field}
                                            placeholder="jhon@example.com"
                                            type="email"
                                            disabled = {isPending}
                                        />
                                    </FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormLabel>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                            disabled = {isPending}
                                        />
                                    </FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message= {error} />
                    <FormSuccess message= {success} />
                    <Button type="submit" className="w-full" disabled = {isPending}>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}