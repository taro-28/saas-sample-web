"use client";
import { Button } from "@/components/ui/button";
import { deleteTodo } from "@/features/todo/delete";
import { TODO } from "@/features/todo/type";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, CircleDashed, Loader, Trash2 } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { toggleTodoDone } from "./toggleDone";

export const todoTableColumns: ColumnDef<TODO>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "done",
    header: "Done",
    cell: ({ row: { original: { id, done } } }) => {
      const [optimisticDone, toggleOptimisticDone] = useOptimistic(
        done,
        (_, done: boolean) => done,
      );

      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={async () => {
            toggleOptimisticDone(!done);
            await toggleTodoDone(id, !done);
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
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt * 1000).toLocaleString(),
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
