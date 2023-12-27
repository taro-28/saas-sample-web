"use client";

import { Combobox } from "@/components/ui/combobox";
import { CategoryComboboxFragment } from "@/gql/generated";
import { ComponentPropsWithoutRef, useMemo } from "react";

/* GraphQL */ `
fragment CategoryCombobox on Query {
    categories {
        id
        name
        createdAt
    }
}
`;

type Props = CategoryComboboxFragment &
  Omit<ComponentPropsWithoutRef<typeof Combobox>, "options">;

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
  return <Combobox {...props} name={name} options={categoryOptions} />;
};
