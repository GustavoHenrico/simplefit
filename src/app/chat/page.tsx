'use client';

import { Button } from "@/components/ui/button";
import CreateChat from "./create-chat";
import { PanelRightClose, PanelRightOpen, PlusCircle } from "lucide-react";
import Image from "next/image";
import logoanimation from "@/assets/animation.jpg";
import { useContext } from "react";
import { SidebarContext } from "@/contexts/sidebarcontext";

export default function Chat() {
    const { isOpen, setIsOpen } = useContext(SidebarContext)
    return (
        <div className="flex flex-col h-screen w-full">
            <div className="p-2">
                <Button onClick={() => { setIsOpen(!isOpen) }} size="icon" variant="ghost" className="hover:text-primary lg:hidden">
                    {isOpen ? <PanelRightOpen size={16} /> : <PanelRightClose size={16} />}
                </Button>
            </div>
            <div className="flex flex-col h-screen w-full justify-center items-center">
                <Image width={100} src={logoanimation} alt="Logo animation" className="motion-safe:animate-[smoothBounce_1s_ease-in-out_infinite]" />

                <div className="flex flex-col gap-4 items-center">
                    <h1 className="text-xl font-semibold">First, create a new chat by clicking here.</h1>
                    <CreateChat>
                        <Button variant="outline" className="gap-2 items-center flex">
                            <PlusCircle size={16} />
                            Create new Chat
                        </Button>
                    </CreateChat>
                </div>
            </div>
        </div>
    );
}