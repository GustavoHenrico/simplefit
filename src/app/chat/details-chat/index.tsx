'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import FormDetailsChat from "./form-create-chat";

type CreateChatProps = {
    children: React.ReactNode;
    chatid: string
}

export default function DetailsChat({ children, chatid }: CreateChatProps) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl sm:h-sm md:h-md lg:h-lg bg-white">
                    <DialogHeader>
                        <DialogTitle>Details Chat</DialogTitle>
                    </DialogHeader>
                    <FormDetailsChat chatid={chatid} setIsOpen={setOpen} />
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
                    <DrawerTitle>Details Chat</DrawerTitle>
                </DrawerHeader>
                <FormDetailsChat chatid={chatid} setIsOpen={setOpen} />
            </DrawerContent>
        </Drawer>
    )
}