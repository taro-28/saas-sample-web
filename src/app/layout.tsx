import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { APP_NAME } from "@/consts";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import NextLink from "next/link";
import { ReactNode } from "react";
import { NavigationItemLink } from "./NavigationItemLink";
import "./globals.css";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "A sample SaaS application built with Next.js",
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
] as const;

export default function RootLayout({ children }: { children: ReactNode }) {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout && JSON.parse(layout.value);

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
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              tagName="nav"
              className="border-r-2"
              minSize={5}
              maxSize={50}
              defaultSize={defaultLayout ? defaultLayout[0] : 10}
            >
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
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              tagName="main"
              className="flex justify-center py-4 px-6"
              defaultSize={defaultLayout ? defaultLayout[1] : 90}
            >
              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
          <footer className="mt-auto border-t-2 p-4 text-center">
            {APP_NAME}
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
