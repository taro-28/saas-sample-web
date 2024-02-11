"use client";

import { Combobox } from "@/components/ui/combobox";
import { FragmentType, getFragmentData, graphql } from "@/gql";
import { type ComponentPropsWithoutRef, useMemo, useTransition } from "react";
import { createCategory } from "./create";

const doc = graphql(`
  fragment CategoryCombobox on Query {
    categories {
      id
      name
      createdAt
    }
  }
`);

type Props = {
  fragmentType: FragmentType<typeof doc>;
} & Omit<
  ComponentPropsWithoutRef<typeof Combobox>,
  "options" | "onCreate" | "isCreating"
>;

export const CategoryCombobox = ({
  fragmentType,
  name = "category",
  ...props
}: Props) => {
  const { categories } = getFragmentData(doc, fragmentType);

  const categoryOptions = useMemo(
    () =>
      categories
        .map(({ id, name }) => ({
          value: id,
          label: name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [categories]
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
