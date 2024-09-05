'use client';

import Image from "next/image";
import Logo from '@/assets/logo.jpg';
import Link from "next/link";
import { MessageSquare, PanelRightClose, PanelRightOpen, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { useContext } from "react";
import { SidebarContext } from "@/contexts/sidebarcontext";

export default function Sidebar() {
    const { isOpen } = useContext(SidebarContext);
    return (
        <>
            <Drawer open={isOpen} direction='left' className="lg:hidden lg:invisible" overlayClassName="lg:hidden lg:invisible">
                <SidebarContent />
            </Drawer>

            <aside className="hidden lg:flex flex-col h-full w-80 bg-card shadow-lg rounded-r-lg ">
                <SidebarContent />
            </aside>
        </>


    )
}


function SidebarContent() {
    const { isOpen, setIsOpen } = useContext(SidebarContext);
    return (
        <>
            <div className="flex justify-between pr-4 lg:justify-center items-center">
                <div className="flex justify-center items-center w-full">
                    <Image className="w-24 lg:w-36" src={Logo} alt="Logo" />
                </div>
                <Button onClick={() => { setIsOpen(false) }} size="icon" variant="ghost" className="hover:text-primary lg:hidden">
                    <PanelRightOpen size={16} />
                </Button>
            </div>

            <div className="h-full flex flex-col space-y-3 overflow-y-auto p-5">
                {Array.from({ length: 10 }).map((_, index) => (
                    <Link key={index} href="#" className="flex gap-2 items-center p-2 hover:bg-background/90 hover:text-black/80 rounded-md text-sm font-semibold">
                        <MessageSquare size={16} />
                        Link
                    </Link>
                ))}

            </div>

            <div className="flex flex-1 p-5">
                <Button variant="ghost" className="flex gap-2 items-center text-primary p-2 hover:bg-background/90 hover:text-primary rounded-md text-sm font-semibold w-full justify-start">
                    <PlusCircle size={16} />
                    Create new Chat
                </Button>
            </div>
        </>
    )
}