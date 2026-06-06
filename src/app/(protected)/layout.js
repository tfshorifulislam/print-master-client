import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../providers";
import Asidebar from "@/components/Asidebar";
import RightSideBar from "@/components/RightSideBar";
import MobileScreenBottomNavbar from "@/components/MobileNavbar";


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <div className="flex max-w-350 mx-auto">
            <Asidebar />
            <main
              className="flex-1 min-h-screen">
              {children}
            </main>
            <MobileScreenBottomNavbar />
            <RightSideBar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
