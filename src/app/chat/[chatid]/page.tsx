'use client';

import ChatFooter from "./chat-footer";
import ChatMessages from "./chat-messages";
import ChatHeader from "../headerbar";
import { useParams, useRouter } from "next/navigation";
import { ChatsContext } from "@/contexts/chatscontext";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";



export default function ChatItem() {
    const { isLoading, getChat } = useContext(ChatsContext);
    const { chatid } = useParams();
    const router = useRouter();
    const chat = getChat(chatid.toString());

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

    if (!chat) {
        return (
            <div className="flex flex-col justify-center items-center h-full w-full">
                <h1 className="text-xl font-semibold">Chat não econtrado!</h1>
                <span>Não te preocupes, começa um novo ou retoma a conversa anterior!</span>
                <Button onClick={() => { router.push("/") }} variant="outline" className="gap-2 items-center flex mt-5">
                    <ArrowBigLeft size={16} />
                    Voltar para a Home
                </Button>
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