'use client';

import Image from "next/image";
import Logo from '@/assets/logo.jpg';
import Link from "next/link";
import { MessageSquare, PanelRightOpen, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { useContext } from "react";
import { SidebarContext } from "@/contexts/sidebarcontext";
import CreateChat from "@/app/chat/create-chat/index";
import { ChatsContext } from "@/contexts/chatscontext";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export default function Sidebar() {
    const { isOpen } = useContext(SidebarContext);
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (!isDesktop) {
        return (
            <Drawer customIdSuffix="drawer" open={isOpen} direction='left' >
                <div className="flex flex-col justify-between h-dvh w-full">
                    <SidebarContent />
                </div>
            </Drawer>
        )
    }

    return (
        <aside className="flex flex-col h-full w-80 bg-card shadow-lg rounded-r-lg ">
            <SidebarContent />
        </aside>
    )
}


function SidebarContent() {
    const { setIsOpen, } = useContext(SidebarContext);
    const { getChats, isLoading } = useContext(ChatsContext);
    const location = usePathname();


    const hadleCloseSideBar = () => {
        setIsOpen(false);
    }

    return (
        <>
            <div className="flex justify-between pr-4 lg:justify-center items-center">
                <Link href={"/chat"} onClick={() => { hadleCloseSideBar() }} className="flex justify-center items-center w-full">
                    <Image className="w-24 lg:w-36" src={Logo} alt="Logo" />
                </Link>
                <Button onClick={() => { setIsOpen(false) }} size="icon" variant="ghost" className="hover:text-primary lg:hidden">
                    <PanelRightOpen size={16} />
                </Button>
            </div>

            <div className="flex-1 flex flex-col space-y-3 overflow-y-auto p-5">
                {isLoading ?
                    Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="bg-background/90 animate animate-pulse h-8 rounded-md" />

                    )) :
                    getChats().map((chat, index) => (
                        <Link href={`/chat/${chat.id}`} key={index} onClick={() => { hadleCloseSideBar() }} className={cn("flex gap-2 items-center p-2 hover:bg-background/90 hover:text-black/80 rounded-md text-sm font-semibold", { "bg-background/90 text-black/80": location === `/chat/${chat.id}` })}>
                            <MessageSquare size={16} />
                            {chat.name}
                        </Link>
                    ))
                }
            </div >

            <div className="p-5">
                <CreateChat>
                    <Button onClick={() => { setIsOpen(false) }} variant="ghost" className="flex gap-2 items-center text-primary p-2 hover:bg-background/90 hover:text-primary rounded-md text-sm font-semibold w-full justify-start">
                        <PlusCircle size={16} />
                        Criar um novo Chat
                    </Button>
                </CreateChat>
            </div>
        </>
    )
}