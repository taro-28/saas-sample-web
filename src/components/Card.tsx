import clsx from "clsx";

type Props = {
  title: string;
  content: string;
} & Omit<JSX.IntrinsicElements["div"], "children">;

export const Card = ({ title, content, className, ...props }: Props) => {
  return (
    <div
      className={clsx(className, "space-y-2 rounded-md border-2 p-4 shadow-md")}
      {...props}
    >
      <div className="text-xl font-bold">{title}</div>
      <div>{content}</div>
    </div>
  );
};
