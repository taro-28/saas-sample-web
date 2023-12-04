"use client";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";

export const NavigationItemLink = ({
  href,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof NextLink>) => {
  const pathname = usePathname();
  return (
    <NextLink
      {...props}
      className={clsx(
        className,
        href === pathname ? "text-blue-500" : "text-gray-500",
      )}
      href={href}
    />
  );
};
