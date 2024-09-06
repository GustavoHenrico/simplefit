'use client';

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/contexts/usercontext";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";

type FormSchema = {
    name: string;
}

type FormCreateUserProps = {
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function FormCreateUser({ setIsOpen }: FormCreateUserProps) {
    const form = useForm<FormSchema>();
    const { addUser } = useContext(UserContext);

    const handleCreateChat = async (data: FormSchema) => {
        addUser({ name: data.name });
        setIsOpen(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateChat)} className="w-full space-y-3">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Name*</FormLabel>
                            <FormControl>
                                <Input required {...field} />
                            </FormControl>
                            <FormDescription className={cn({ "text-red-600": fieldState.error?.message })}>
                                {fieldState.error?.message ? fieldState.error.message : "This won't be public. It's just for you."}
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button type="submit">Submit</Button>
                </DialogFooter>
            </form>
        </Form>

    )
}

