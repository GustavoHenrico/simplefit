'use client';

import { UserContext } from "@/contexts/usercontext";
import { useContext } from "react";
import CreateUser from "../user/create-user";

type ChatLayoutProps = {
    children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
    const { getUser } = useContext(UserContext);

    if (!getUser().name) {
        return <CreateUser />
    }

    return children
}

