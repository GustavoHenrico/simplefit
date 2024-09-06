'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import FormDetailsChat from "./form-details-chat";

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
                <DialogContent className="max-w-2xl max-h-dvh-minus-80px h-full p-0 bg-white">
                    <DialogHeader className="flex items-center justify-center p-5">
                        <DialogTitle>Details Chat</DialogTitle>
                    </DialogHeader>
                    <div className="h-full w-full overflow-auto p-5">
                        <FormDetailsChat chatid={chatid} setIsOpen={setOpen} />
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
                    <DrawerTitle>Details Chat</DrawerTitle>
                </DrawerHeader>
                <div className="h-full w-full overflow-auto p-5">
                    <FormDetailsChat chatid={chatid} setIsOpen={setOpen} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}