'use client';

import { useChat } from "ai/react";
import { useParams } from "next/navigation";
import ChatFooter from "./chat-footer";
import ChatMessages from "./chat-messages";
import ChatHeader from "../headerbar";


export default function ChatItem() {
    const { chatid } = useParams();
    const { messages, input, handleInputChange, handleSubmit, append } = useChat({ id: chatid.toString() });



    return (
        <div className="flex flex-col h-full w-full gap-3">
            <ChatHeader />
            <ChatMessages />
            <ChatFooter />
        </div>
    );
}