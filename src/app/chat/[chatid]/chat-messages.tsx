import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat } from "ai/react";
import { useParams } from "next/navigation";
import IaProfile from "@/assets/profile.jpg";
import { cn } from "@/lib/utils";
import { useContext, useEffect, useRef } from "react";
import { ChatsContext } from "@/contexts/chatscontext";
import { UserContext } from "@/contexts/usercontext";
import MarkdownPreview from '@uiw/react-markdown-preview';


export default function ChatMessages() {
    const { getChat, updateChat } = useContext(ChatsContext);
    const { chatid } = useParams();
    const { getUser } = useContext(UserContext);
    const divRef = useRef<HTMLDivElement>(null);
    const chat = getChat(chatid.toString());
    const { messages } = useChat({
        id: chat?.id,
        initialMessages: chat?.messages,
        body: {
            userName: getUser().name,
            level: chat?.level || "",
            frequency: chat?.frequency || "",
            medicalConditions: chat?.medicalConditions || "",
            personalPreferences: chat?.personalPreferences || "",
            goal: chat?.goal || ""
        }
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const chat = getChat(chatid.toString());
            if (chat) {
                updateChat({ ...chat, messages: messages });
            }
        }, 1000);
        divRef?.current?.scrollIntoView({ behavior: "smooth" });
        return () => clearTimeout(timeoutId);
    }, [messages, chatid]);


    return (
        <div className="h-full flex-1 w-full flex flex-col-reverse overflow-auto justify-center items-center">
            <div className="flex flex-col justify-end mx-auto max-w-5xl w-full h-full space-y-6 my-16 p-1 lg:p-0">
                {messages.map((message, index) => {
                    if (message.role === "user") {
                        return (
                            <div key={message.id} className={cn("flex gap-1 flex-row-reverse items-center", { "items-start": message.content.length > 80 })}>
                                <Avatar>
                                    <AvatarImage src="" alt="" />
                                    <AvatarFallback className="bg-primary text-white">{getUser().name.substring(0, 2)}</AvatarFallback>
                                </Avatar>

                                <MarkdownPreview source={message.content} wrapperElement={{ "data-color-mode": "light" }} className="bg-white p-3 rounded-lg shadow-sm max-w-sm lg:max-w-2xl" />
                            </div>
                        )
                    } else if (message.role === 'assistant') {
                        return (
                            <div key={message.id} className={cn("flex gap-1 items-center", { "items-start": message.content.length > 80 })}>
                                <Avatar>
                                    <AvatarImage src={IaProfile.src} alt="" />
                                    <AvatarFallback className="bg-primary text-white">SF</AvatarFallback>
                                </Avatar>

                                <MarkdownPreview source={message.content} wrapperElement={{ "data-color-mode": "light" }} className="bg-white p-3 rounded-lg shadow-sm max-w-sm lg:max-w-2xl" />
                            </div>
                        )
                    }
                })}
                <div ref={divRef} />
            </div>
        </div>
    )
}