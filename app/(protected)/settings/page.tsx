"use client"
import { useRouter } from "next/router";
import { IoSettingsOutline } from "react-icons/io5";
import {
    Card, CardHeader, CardContent
} from "@/components/ui/card"
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button"
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";
import { Form, FormField, FormControl, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";


import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"


import { UserRole } from "@prisma/client";

import { Input } from "@/components/ui/input"
import { z } from "zod";
import { useCurrentUser } from "@/hooks/user-current-user";

export default function () {
    const { update } = useSession() //only update client side

    const user = useCurrentUser()


    console.log('TYPE', typeof user?.role)

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()





    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled :  !!user?.isTwoFactorEnabled || undefined  //will fix later
            
              
        }
    })



    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {

          setError("")
          setSuccess("")

        startTransition(() => {
            settings(values).then((data) => {

                console.log("this function ran")
                if (data.error) {
                    setError(data.error)
                    console.log("caught error")
                }

                if (data.success) {
                    setSuccess(data.success)
                    update()
                    console.log("success")
                }

            }).catch((err: any) => {
                console.log(err)
                setError(err.error)

            })
        })

    }

    return (
        <>
            <Card className="w-[600px]">
                <CardHeader>
                    <div className=" flex items-center justify-center gap-2 ">
                        <IoSettingsOutline />
                        <p className="text-xl font-semibold text-center"> Settings</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className=" space-y-6 my-4">
                        <Form {...form}>
                            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)} >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Jhon Doe"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>

                                    )}

                                />

                                {user?.isOAuth === false && <>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>

                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="jhon.doe@example.com"
                                                        disabled={isPending}
                                                        type="email"
                                                    />
                                                </FormControl>
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
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="******"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>

                                        )}

                                    />

                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="******"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>

                                        )}

                                    />

                                </>}

                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <Select
                                                disabled={isPending}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value={UserRole.ADMIN}>
                                                        Admin
                                                    </SelectItem>
                                                    <SelectItem value={UserRole.USER}>
                                                        User
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>


                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="isTwoFactorEnabled"
                                    render={({ field }) => (
                                        <FormItem className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className=" spcae-y-0.5">
                                                <FormLabel>Two Factor Authentication</FormLabel>
                                                <FormDescription>
                                                    Enable two factor authentication for your account
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch disabled={isPending}
                                                    checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>



                                        </FormItem>

                                    )}

                                />

                                <FormError message={error} />
                                <FormSuccess message={success} />
                                <Button type="submit">
                                    Save
                                </Button>
                            </form>
                        </Form>
                    </div>




                </CardContent>
            </Card>
        </>
    )

}