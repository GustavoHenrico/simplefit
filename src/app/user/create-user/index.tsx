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
                        <DialogTitle>Welcome to SimpleFit!</DialogTitle>
                        <DialogDescription>Enter your name to get started. This is just to personalize your experience.</DialogDescription>
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
                    <DrawerTitle>Welcome to SimpleFit!</DrawerTitle>
                    <DrawerDescription>Enter your name to get started. This is just to personalize your experience.</DrawerDescription>
                </DrawerHeader>
                <div className="h-full w-full p-5">
                    <FormCreateUser setIsOpen={setOpen} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}