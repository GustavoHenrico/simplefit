'use client';

import { createContext, useState } from "react";

type SidebarContextType = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const SidebarContext = createContext({} as SidebarContextType);

type SidebarProviderProps = {
    children: React.ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </SidebarContext.Provider>
    );
}