'use client';

import ChatFooter from "./chat-footer";
import ChatMessages from "./chat-messages";
import ChatHeader from "../headerbar";
import { useParams } from "next/navigation";
import { ChatsContext } from "@/contexts/chatscontext";
import { useContext } from "react";
import { useChat } from "ai/react";



export default function ChatItem() {
    const { isLoading } = useContext(ChatsContext);



    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full w-full">
                <div className="flex gap-1">
                    <span className="size-3 rounded-full bg-slate-500 motion-safe:animate-[bounce_1s_ease-in-out_infinite]"></span>
                    <span className="size-3 rounded-full bg-slate-500 motion-safe:animate-[bounce_0.5s_ease-in-out_infinite]"></span>
                    <span className="size-3 rounded-full bg-slate-500 motion-safe:animate-[bounce_1s_ease-in-out_infinite]"></span>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full w-full gap-3">
            <ChatHeader />
            <ChatMessages />
            <ChatFooter />
        </div>
    );
}