/** @format */

import type { Metadata } from "next";
import "./globals.css";
import { ReduxProviders, ThemeProviders } from "./providers";
import NavBar from "@/components/NavBar";
import TailwindScreenIndicators from "@/components/TailwindScreenIndicators";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import DeleteModal from "@/components/Modals/DeleteModal";
import StatusInfoModal from "@/components/Modals/StatusInfoModal";
import AddPersonalBookmarkModal from "@/components/Modals/AddPersonalBookmarkModal";

export const metadata: Metadata = {
  title: "Bookmark Manager",
  description:
    "Organize, categorize, and access your bookmarks seamlessly with our efficient bookmark management tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <ReduxProviders>
            <ThemeProviders>
              <NavBar />
              <main className={`mx-auto max-w-[104rem] px-5 pt-24`}>
                {children}
              </main>
              <TailwindScreenIndicators />
              <DeleteModal />
              <StatusInfoModal />
              <AddPersonalBookmarkModal />
            </ThemeProviders>
          </ReduxProviders>
        </UserProvider>
      </body>
    </html>
  );
}
