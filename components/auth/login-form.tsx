"use client"
import { useSearchParams } from "next/navigation"
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
import { AuthError } from "next-auth"
import { useRouter } from "next/navigation"
import Link from "next/link"

export const LoginForm = () => {

    const router = useRouter()


    const searchParams = useSearchParams()
    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider" : ""


    const form = useForm<z.infer<typeof LoginSchema>>({
        defaultValues: {
            email: "",
            password: "",
            code: ""
        },

        resolver: zodResolver(LoginSchema)

    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {

        setError("")
        setSuccess("")

        startTransition(() => {
            login(values).then((data) => {

                if (data?.twoFactor) {
                    setShowTwoFactor(true)
                }

                setSuccess(data?.success)
                console.log(data)
                router.push('/settings')

            }).catch((err) => {

                setError(err.message)



            })
        })

    }


    return (
        <CardWrapper headerLable="Welcome back" backButtonLabel="Don't have an account" showSocial backButtonHref="/auth/register" >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                    <div className=" space-y-4">
                        {showTwoFactor && <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Two Factor Code</FormLabel>
                                    <FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="123456"
                                                disabled={isPending}

                                            />
                                        </FormControl>
                                    </FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        }
                        {!showTwoFactor && (<>
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

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="******"
                                                    type="password"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <Button size={"sm"} variant={"link"}
                                                asChild className=" px-0 font-normal">
                                                <Link href={"/auth/reset_password"}>
                                                    Forgot password?
                                                </Link></Button>
                                        </FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>)}
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {!showTwoFactor ? "Login" : "Confirm"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}