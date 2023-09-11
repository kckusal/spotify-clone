import { Sidebar } from "@/components/Sidebar";
import { MyUserContextProvider } from "@/hooks/useUser";
import { SupabaseProvider } from "@/providers/SupabaseProvider";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "./globals.css";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={twMerge("flex", font.className)}>
        <SupabaseProvider>
          <MyUserContextProvider>
            <Sidebar />
            {children}
          </MyUserContextProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
