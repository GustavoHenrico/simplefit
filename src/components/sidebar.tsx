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
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Sidebar() {
    const { isOpen } = useContext(SidebarContext);
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (!isDesktop) {
        return (
            <Drawer open={isOpen} direction='left' className="flex flex-col h-full bg-card">
                <SidebarContent />
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
    const router = useRouter();

    const hadleCloseSideBar = () => {
        setIsOpen(false);
    }

    return (
        <>
            <div className="flex justify-between pr-4 lg:justify-center items-center">
                <div onClick={() => { router.push("/chat") }} className="flex justify-center items-center w-full">
                    <Image className="w-24 lg:w-36" src={Logo} alt="Logo" />
                </div>
                <Button onClick={() => { setIsOpen(false) }} size="icon" variant="ghost" className="hover:text-primary lg:hidden">
                    <PanelRightOpen size={16} />
                </Button>
            </div>

            <div className="h-full flex flex-col space-y-3 overflow-y-auto p-5">
                {isLoading ?
                    Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="bg-background/90 animate animate-pulse h-8 rounded-md" />

                    )) :
                    getChats().map((chat, index) => (
                        <Link href={`/chat/${chat.id}`} key={index} onClick={() => { hadleCloseSideBar() }} className="flex gap-2 items-center p-2 hover:bg-background/90 hover:text-black/80 rounded-md text-sm font-semibold">
                            <MessageSquare size={16} />
                            {chat.name}
                        </Link>
                    ))
                }
            </div>

            <div className="p-5">
                <CreateChat>
                    <Button onClick={() => { setIsOpen(false) }} variant="ghost" className="flex gap-2 items-center text-primary p-2 hover:bg-background/90 hover:text-primary rounded-md text-sm font-semibold w-full justify-start">
                        <PlusCircle size={16} />
                        Create new Chat
                    </Button>
                </CreateChat>
            </div>
        </>
    )
}