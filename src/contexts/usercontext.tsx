'use client';

import { User } from "@/models/user";
import { createContext, useEffect, useState } from "react";

type UserContextType = {
    addUser: (user: User) => void;
    getUser: () => User;
}

export const UserContext = createContext({} as UserContextType);

type UserProviderProps = {
    children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User>({ name: '' });

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user') || '{}'));
    }, []);

    const addUser = (user: User) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    const getUser = () => {
        return user;
    }

    return (
        <UserContext.Provider value={{ addUser, getUser }}>
            {children}
        </UserContext.Provider>
    );
}