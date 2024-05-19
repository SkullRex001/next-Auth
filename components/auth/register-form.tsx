"use client"

import { CardWrapper } from "@/components/auth/card-wrapper"
import * as z from 'zod'
import { RegisterSchema } from "@/schemas"
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
import { register } from "@/actions/register"

export const RegisterForm = () => {

    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        defaultValues: {
            email: "",
            password: "",
            name: ""
        },

        resolver: zodResolver(RegisterSchema)

    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

        setError("")
        setSuccess("")

        startTransition(() => {
            register(values).then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        })

    }


    return (
        <CardWrapper headerLable="Create an account" backButtonLabel="Already have an account" showSocial backButtonHref="/auth/login" >
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
                                            disabled={isPending}
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
                                            disabled={isPending}
                                        />
                                    </FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormLabel>
                                        <Input
                                            {...field}
                                            placeholder="John Doe"
                                            type="text"
                                            disabled={isPending}
                                        />
                                    </FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}