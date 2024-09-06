import { Button } from "@/components/ui/button";
import { ChatsContext } from "@/contexts/chatscontext";
import { UserContext } from "@/contexts/usercontext";
import { useChat } from "ai/react";
import { CirclePause, Send, SendHorizontal } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";


export default function ChatFooter() {
    const { chatid } = useParams();
    const { getChat } = useContext(ChatsContext);
    const { getUser } = useContext(UserContext);
    const chat = getChat(chatid.toString());

    const { input, handleInputChange, handleSubmit, isLoading } = useChat({
        id: chatid.toString(),
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && !isLoading) {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
        }
    };

    return (
        <div className="flex justify-center items-center mx-3 mb-1 lg:mx-0 lg:mb-3">
            <form onSubmit={handleSubmit} className="flex bg-card max-w-5xl w-full shadow-md rounded-xl p-3 gap-3">
                <ReactTextareaAutosize
                    value={input}
                    minRows={1}
                    placeholder="Digite aqui sua mensagem..."
                    maxRows={10}
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                    className="border-input px-5 py-3 shadow-sm placeholder-text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full border rounded-md resize-none"
                />

                <div className="flex items-end">
                    <div className="flex justify-center items-center h-12">
                        {isLoading ? (
                            <Button size="icon">
                                <CirclePause size={20} />
                            </Button>
                        ) : (
                            <Button disabled={isLoading} type="submit" size="icon">
                                <SendHorizontal size={20} />
                            </Button>
                        )}

                    </div>
                </div>
            </form >
        </div >
    )
}