"use client";
import { Button } from "@/components/ui/button";
import { MakeTodoTableColumnsFragment } from "@/gql/generated";
import { Temporal } from "@js-temporal/polyfill";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, CircleDashed } from "lucide-react";
import { useOptimistic } from "react";
import { CategoryCombobox } from "../category/combobox";
import { TableDeleteCell } from "./TableDeleteCell";
import { updateTodoDone } from "./toggleDone";

/* GraphQL */ `
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

fragment MakeTodoTableColumns on Query {
  todos {
    ...TodoTableTodo
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
    cell: TableDeleteCell,
  },
];
