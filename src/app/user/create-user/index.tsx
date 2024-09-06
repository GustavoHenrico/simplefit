'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import FormCreateUser from "./form-create-user";
import { DialogDescription } from "@radix-ui/react-dialog";


export default function CreateUser() {
    const [open, setOpen] = useState(true)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open}>
                <DialogContent className="max-w-2xl p-0 bg-white">
                    <DialogHeader className="flex items-center justify-center p-5">
                        <DialogTitle>Bem-vindo ao SimpleFit!</DialogTitle>
                        <DialogDescription>Digite seu nome para começar. Isso serve apenas para personalizar sua experiência.</DialogDescription>
                    </DialogHeader>
                    <div className="h-full w-full p-5">
                        <FormCreateUser setIsOpen={setOpen} />
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
                    <FormCreateUser setIsOpen={setOpen} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}