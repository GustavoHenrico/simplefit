import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat } from "ai/react";
import { useParams } from "next/navigation";
import IaProfile from "@/assets/profile.jpg";
import { cn } from "@/lib/utils";
import { useContext, useEffect } from "react";
import { ChatsContext } from "@/contexts/chatscontext";
import { UserContext } from "@/contexts/usercontext";

export default function ChatMessages() {
    const { getChat, updateChat } = useContext(ChatsContext);
    const { chatid } = useParams();
    const { getUser } = useContext(UserContext);
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
                console.log('updating chat', messages);
                updateChat({ ...chat, messages: messages });
            }
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [messages, chatid]);


    return (
        <div className="h-full flex-1 w-full flex flex-col-reverse overflow-auto justify-center items-center [overflow-anchor:auto] ">
            <div className="flex flex-col justify-end mx-auto max-w-5xl w-full h-full space-y-6 my-16 p-1 lg:p-0">
                {messages.map((message, index) => {
                    if (message.role === "user") {
                        return (
                            <div key={message.id} className={cn("flex gap-1 flex-row-reverse items-center", { "items-start": message.content.length > 80 })}>
                                <Avatar>
                                    <AvatarImage src="" alt="" />
                                    <AvatarFallback className="bg-primary text-white">GH</AvatarFallback>
                                </Avatar>

                                <div className="bg-white p-3 rounded-lg shadow-sm max-w-sm lg:max-w-2xl">
                                    {message.content}
                                </div>
                            </div>
                        )
                    } else if (message.role === 'assistant') {
                        return (
                            <div key={message.id} className={cn("flex gap-1 items-center", { "items-start": message.content.length > 80 })}>
                                <Avatar>
                                    <AvatarImage src={IaProfile.src} alt="" />
                                    <AvatarFallback className="bg-primary text-white">SF</AvatarFallback>
                                </Avatar>

                                <div className="bg-white p-3 rounded-lg shadow-sm max-w-sm lg:max-w-2xl">
                                    {message.content}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}