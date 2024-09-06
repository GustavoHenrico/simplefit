
'use client';

import Sidebar from "@/components/sidebar";
import { ChatsProvider } from "@/contexts/chatscontext";
import { SidebarProvider } from "@/contexts/sidebarcontext";
import "@/styles/globals.css";
import { UserContext, UserProvider } from "@/contexts/usercontext";
import CreateUser from "./user/create-user";
import { useContext, useState } from "react";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <SidebarProvider>
            <ChatsProvider>
              <div className="flex w-full h-dvh sm:h-screen">
                <Sidebar />
                <main className="flex flex-1 overflow-hidden">
                  <CheckUsingUser />
                  {children}
                </main>
              </div>
            </ChatsProvider>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}

export function CheckUsingUser() {
  const { getUser } = useContext(UserContext);

  return (
    <div>
      {!getUser().name && <CreateUser />}
    </div>
  )



}
