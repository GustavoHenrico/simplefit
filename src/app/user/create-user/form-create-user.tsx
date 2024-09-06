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
                            <FormLabel>Nome*</FormLabel>
                            <FormControl>
                                <Input required {...field} />
                            </FormControl>
                            <FormDescription className={cn({ "text-red-600": fieldState.error?.message })}>
                                {fieldState.error?.message ? fieldState.error.message : "Este nome é apenas para sua identificação, não será público."}
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button type="submit">Enviar</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

