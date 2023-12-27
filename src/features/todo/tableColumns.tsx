"use client";
import { Button } from "@/components/ui/button";
import { deleteTodo } from "@/features/todo/delete";
import { MakeTodoTableColumnsFragment } from "@/gql/generated";
import { Temporal } from "@js-temporal/polyfill";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, CircleDashed, Loader, Trash2 } from "lucide-react";
import { useOptimistic, useState, useTransition } from "react";
import { CategoryCombobox } from "../category/combobox";
import { updateTodoDone } from "./toggleDone";

/* GraphQL */ `
fragment MakeTodoTableColumns on Query {
  todos {
    id
    content
    done
    createdAt
    category {
      id
      name
    }
  }
  ...CategoryCombobox
}
`;

type Props = Pick<MakeTodoTableColumnsFragment, "categories">;

export const makeTodoTableColumns: (
  props: Props
) => ColumnDef<MakeTodoTableColumnsFragment["todos"][number]>[] = ({
  categories,
}) => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "done",
    header: "Done",
    cell: ({
      row: {
        original: { id, done },
      },
    }) => {
      const [optimisticDone, toggleOptimisticDone] = useOptimistic(
        done,
        (_, done: boolean) => done
      );

      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={async () => {
            toggleOptimisticDone(!done);
            await updateTodoDone(id, !done);
          }}
        >
          {optimisticDone ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <CircleDashed />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "category.name",
    header: "Category",
    cell: ({ row }) => {
      return (
        <CategoryCombobox
          categories={categories}
          value={row.original.category?.id ?? ""}
          onChange={(value) => {
            console.log(value);
          }}
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) =>
      Temporal.Instant.fromEpochSeconds(row.original.createdAt).toLocaleString(
        "ja-JP"
      ),
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const [isPending, startTransition] = useTransition();

      return (
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          onClick={() => startTransition(() => deleteTodo(row.original.id))}
        >
          {isPending ? (
            <Loader className="animate-spin h-5 w-5" />
          ) : (
            <Trash2 className="h-5 w-5" />
          )}
        </Button>
      );
    },
  },
];
