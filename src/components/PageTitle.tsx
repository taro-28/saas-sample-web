import clsx from "clsx";
import type React from "react";

export const PageTitle = ({
  className,
  ...props
}: React.JSX.IntrinsicElements["h1"]) => (
  <h1 className={clsx("text-3xl font-bold", className)} {...props} />
);
