import Sidebar from "@/components/sidebar";
import { SidebarProvider } from "@/contexts/sidebarcontext";
import "@/styles/globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex w-full h-screen">
            <Sidebar />
            <main className="flex flex-1 overflow-hidden">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
