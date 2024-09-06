'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import FormCreateChat from "./form-create-chat";
import { useMediaQuery } from "@/hooks/use-media-query";

type CreateChatProps = {
    children: React.ReactNode;
}

export default function CreateChat({ children }: CreateChatProps) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-dvh-minus-80px h-full p-0 bg-white">
                    <DialogHeader className="flex items-center justify-center p-5">
                        <DialogTitle>Create new Chat</DialogTitle>
                    </DialogHeader>
                    <div className="h-full w-full overflow-auto p-5">
                        <FormCreateChat setIsOpen={setOpen} />
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className="bg-white max-h-dvh">
                <DrawerHeader>
                    <DrawerTitle>Create new Chat</DrawerTitle>
                </DrawerHeader>
                <div className="h-full w-full overflow-auto p-5">
                    <FormCreateChat setIsOpen={setOpen} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}