"use client";

import { Combobox } from "@/components/ui/combobox";
import type { CategoryComboboxFragment } from "@/gql/generated";
import { type ComponentPropsWithoutRef, useMemo, useTransition } from "react";
import { createCategory } from "./create";

`#graphql
fragment CategoryCombobox on Query {
    categories {
        id
        name
        createdAt
    }
}
`;

type Props = CategoryComboboxFragment &
  Omit<
    ComponentPropsWithoutRef<typeof Combobox>,
    "options" | "onCreate" | "isCreating"
  >;

export const CategoryCombobox = ({
  categories,
  name = "category",
  ...props
}: Props) => {
  const categoryOptions = useMemo(
    () =>
      categories
        .map(({ id, name }) => ({
          value: id,
          label: name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [categories],
  );
  const [isPending, startTransition] = useTransition();
  return (
    <Combobox
      {...props}
      name={name}
      options={categoryOptions}
      isCreating={isPending}
      onCreate={(value) => startTransition(() => createCategory(value))}
    />
  );
};
