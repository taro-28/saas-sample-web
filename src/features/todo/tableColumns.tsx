"use client";
import { FragmentType, getFragmentData, graphql } from "@/gql";
import { TodoTableTodoFragment } from "@/gql/graphql";
import { Temporal } from "@js-temporal/polyfill";
import { ColumnDef } from "@tanstack/react-table";
import { useOptimistic, useTransition } from "react";
import { CategoryCombobox } from "../category/combobox";
import { TableDeleteCell } from "./TableDeleteCell";
import { TableDoneCell } from "./TableDoneCell";
import { updateTodo } from "./update";

export const todoFragmentDoc = graphql(`
  fragment TodoTableTodo on Todo {
    id
    content
    done
    createdAt
    category {
      id
      name
    }
  }
`);

const queryFragmentDoc = graphql(`
  fragment MakeTodoTableColumns on Query {
    todos {
      ...TodoTableTodo
    }
    ...CategoryCombobox
  }
`);

type Props = {
  fragmentType: FragmentType<typeof queryFragmentDoc>;
};

export const makeTodoTableColumns: (
  props: Props
) => ColumnDef<TodoTableTodoFragment>[] = ({ fragmentType }) => {
  const data = getFragmentData(queryFragmentDoc, fragmentType);
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "done",
      header: "Done",
      cell: TableDoneCell,
    },
    {
      accessorKey: "content",
      header: "Content",
    },
    {
      accessorKey: "category.name",
      header: "Category",
      cell: ({ row: { original } }) => {
        const [optimisticCategory, selectOptimisticCategory] = useOptimistic(
          original.category?.id ?? "",
          (_, categoryId: string) => categoryId
        );
        const [_, startTransition] = useTransition();
        return (
          <CategoryCombobox
            fragmentType={data}
            value={optimisticCategory}
            onChange={async (value) => {
              startTransition(() => selectOptimisticCategory(value));
              await updateTodo({
                id: original.id,
                content: original.content,
                categoryId: value,
              });
            }}
          />
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) =>
        Temporal.Instant.fromEpochSeconds(
          row.original.createdAt
        ).toLocaleString("ja-JP"),
    },
    {
      id: "delete",
      cell: TableDeleteCell,
    },
  ];
};
