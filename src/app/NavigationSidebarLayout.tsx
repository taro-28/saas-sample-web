import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import { NavigationItemLink } from "./NavigationItemLink";
import "./globals.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
] as const;

type Props = {
  children: ReactNode;
};

export const NavigationSidebarLayout = ({ children }: Props) => {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout && JSON.parse(layout.value);
  return (
    <ResizablePanelGroup
      direction="horizontal"
      autoSaveId="layout-sidebar-width"
    >
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
  );
};
