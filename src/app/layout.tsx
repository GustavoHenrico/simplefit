import Sidebar from "@/components/sidebar";
import { ChatsProvider } from "@/contexts/chatscontext";
import { SidebarProvider } from "@/contexts/sidebarcontext";
import { UserProvider } from "@/contexts/usercontext";
import "@/styles/globals.css";

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

