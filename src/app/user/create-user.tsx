'use client';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useContext, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { UserContext } from "@/contexts/usercontext";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";


type FormSchema = {
    name: string;
}

export default function CreateUser() {
    const [open, setOpen] = useState(true)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const form = useForm<FormSchema>();
    const { addUser } = useContext(UserContext);

    const handleCreateChat = async (data: FormSchema) => {
        addUser({ name: data.name });
        setOpen(false);
    }

    if (isDesktop) {
        return (
            <Dialog open={open}>
                <DialogContent className="max-w-2xl p-0 bg-white">
                    <DialogHeader className="flex items-center justify-center p-5">
                        <DialogTitle>Bem-vindo ao SimpleFit!</DialogTitle>
                        <DialogDescription>Digite seu nome para começar. Isso serve apenas para personalizar sua experiência.</DialogDescription>
                    </DialogHeader>
                    <div className="h-full w-full p-5">
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
                    </div>
                </DialogContent>
            </Dialog>

        )
    }

    return (
        <Drawer open={open}>
            <DrawerContent className="bg-white max-h-dvh">
                <DrawerHeader>
                    <DrawerTitle>Bem-vindo ao SimpleFit!</DrawerTitle>
                    <DrawerDescription>Digite seu nome para começar. Isso serve apenas para personalizar sua experiência.</DrawerDescription>
                </DrawerHeader>
                <div className="h-full w-full p-5">
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

                            <DrawerFooter>
                                <Button type="submit">Enviar</Button>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    )
}