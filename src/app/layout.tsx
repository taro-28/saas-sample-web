import { APP_NAME } from "@/consts";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import NextLink from "next/link";
import { ReactNode } from "react";
import { NavigationItemLink } from "./NavigationItemLink";
import "./globals.css";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "A sample SaaS application built with Next.js",
};

const navItems = [{ href: "/", label: "Home" }] as const;

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]">
          <header className="col-span-2 border-b-2 p-4 text-center flex justify-between">
            <NextLink className="text-2xl font-bold" href="/">
              {APP_NAME}
            </NextLink>
            <UserButton afterSignOutUrl="/" />
          </header>
          <nav className="border-r-2">
            <ul>
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <NavigationItemLink
                    className="block px-6 py-2 text-lg hover:bg-gray-50"
                    href={href}
                  >
                    {label}
                  </NavigationItemLink>
                </li>
              ))}
            </ul>
          </nav>
          <main className="flex justify-center py-4 px-6">{children}</main>
          <footer className="col-span-2 mt-auto border-t-2 p-4 text-center">
            {APP_NAME}
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
