"use client";

import { Combobox } from "@/components/ui/combobox";
import { CategoryComboboxFragment } from "@/gql/generated";
import { useMemo } from "react";

/* GraphQL */ `
fragment CategoryCombobox on Query {
    categories {
        id
        name
        createdAt
    }
}
`;

type Props = {
  name: string;
} & CategoryComboboxFragment;

export const CategoryCombobox = ({ name, categories }: Props) => {
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
  return <Combobox name={name} options={categoryOptions} />;
};
