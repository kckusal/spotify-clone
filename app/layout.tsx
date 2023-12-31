import { getActiveProductsWithPrices } from "@/actions/getActiveProductsWithPrices";
import { getSongsByUserId } from "@/actions/getSongsByUserId";
import { Player } from "@/components/Player";
import { Sidebar } from "@/components/Sidebar";
import { MyUserContextProvider } from "@/hooks/useUser";
import { ModalProvider } from "@/providers/ModalProvider";
import { SupabaseProvider } from "@/providers/SupabaseProvider";
import { ToasterProvider } from "@/providers/ToasterProvider";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "./globals.css";

const font = Figtree({ subsets: ["latin"] });

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={twMerge("flex", font.className)}>
        <ToasterProvider />

        <SupabaseProvider>
          <MyUserContextProvider>
            <ModalProvider products={products} />

            <Sidebar songs={userSongs}>{children}</Sidebar>

            <Player />
          </MyUserContextProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
