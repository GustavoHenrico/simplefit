'use client';

import { Chat } from "@/models/chat";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

type ChatsContextType = {
    addChat: (chat: Chat) => void;
    removeChat: (chat: Chat) => void;
    updateChat: (chat: Chat) => void;
    getChat: (id: string) => Chat | undefined;
    getChats: () => Chat[];
    reloadChats: () => void;
    isLoading?: boolean;
}

export const ChatsContext = createContext({} as ChatsContextType);

type ChatsProviderProps = {
    children: React.ReactNode;
}

export function ChatsProvider({ children }: ChatsProviderProps) {
    const [chats, setChats] = useState<Chat[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        setChats(JSON.parse(localStorage.getItem('chats') || '[]'))
        setIsLoading(false);
    }, [])


    function addChat(chat: Chat) {
        setChats([...chats, chat]);
        localStorage.setItem('chats', JSON.stringify([...chats, chat]));
    }

    function removeChat(chat: Chat) {
        const newChats = chats.filter(c => c.id !== chat.id);
        setChats(newChats);
        localStorage.setItem('chats', JSON.stringify(newChats));
        router.push('/chat');
    }

    function updateChat(chat: Chat) {
        const newChats = chats.map(c => c.id === chat.id ? chat : c);
        setChats(newChats);
        localStorage.setItem('chats', JSON.stringify(newChats));
    }

    function getChat(id: string) {
        return chats.find(c => c.id === id);
    }

    function reloadChats() {
        setIsLoading(true);
        setChats(JSON.parse(localStorage.getItem('chats') || '[]'));
        setIsLoading(false);
    }

    function getChats() {
        return chats;
    }

    return (
        <ChatsContext.Provider value={{ addChat, getChat, getChats, reloadChats, removeChat, updateChat, isLoading }}>
            {children}
        </ChatsContext.Provider>
    );
}