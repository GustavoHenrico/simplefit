'use client';

import { Button } from "@/components/ui/button";
import { PanelRightClose, PanelRightOpen, Settings, Share2, Trash } from "lucide-react";
import DetailsChat from "./details-chat";
import { useContext } from "react";
import { SidebarContext } from "@/contexts/sidebarcontext";



export default function ChatHeader() {
    const { isOpen, setIsOpen } = useContext(SidebarContext);

    return (
        <header className="flex w-full p-3 justify-between items-center">
            <div className="flex gap-2 items-center">
                <Button onClick={() => { setIsOpen(!isOpen) }} size="icon" variant="ghost" className="hover:text-primary lg:hidden">
                    {isOpen ? <PanelRightOpen size={16} /> : <PanelRightClose size={16} />}
                </Button>
                <span className="text-sm font-semibold">Chat: Gustavo Henrico - Treinos</span>
            </div>
            <div className="flex gap-2">
                <DetailsChat>
                    <Button size="icon" variant="ghost" className="hover:text-primary"><Settings size={17} /></Button>
                </DetailsChat>
                <Button size="icon" variant="ghost" className="hover:text-primary"><Trash size={16} /></Button>
                <Button disabled size="icon" variant="ghost" className="hover:text-primary"><Share2 size={16} /></Button>
            </div>
        </header>
    )
}