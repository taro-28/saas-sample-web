import { APP_NAME } from "@/consts";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import NextLink from "next/link";
import { ReactNode } from "react";
import { NavigationSidebarLayout } from "./NavigationSidebarLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "A sample SaaS application built with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="grid min-h-screen grid-rows-[auto_1fr_auto]">
          <header className="border-b-2 p-4 text-center flex justify-between">
            <NextLink className="text-2xl font-bold" href="/">
              {APP_NAME}
            </NextLink>
            <UserButton afterSignOutUrl="/" />
          </header>
          <NavigationSidebarLayout>{children}</NavigationSidebarLayout>
          <footer className="mt-auto border-t-2 p-4 text-center">
            {APP_NAME}
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
