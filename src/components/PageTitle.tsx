import clsx from "clsx";

export const PageTitle = ({
  className,
  ...props
}: JSX.IntrinsicElements["h1"]) => (
  <h1 className={clsx("text-3xl font-bold", className)} {...props} />
);
