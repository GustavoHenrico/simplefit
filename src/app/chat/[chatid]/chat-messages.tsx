import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat } from "ai/react";
import { useParams } from "next/navigation";
import IaProfile from "@/assets/profile.jpg";
import { cn } from "@/lib/utils";

export default function ChatMessages() {
    const { chatid } = useParams();
    const { messages } = useChat({ id: chatid.toString() });

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