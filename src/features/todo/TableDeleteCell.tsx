"use client";

import { Button } from "@/components/ui/button";
import { deleteTodo } from "@/features/todo/delete";
import { TodoTableTodoFragment } from "@/gql/graphql";
import type { CellContext } from "@tanstack/react-table";
import { Loader, Trash2 } from "lucide-react";
import { useTransition } from "react";

type Props = CellContext<TodoTableTodoFragment, unknown>;

export const TableDeleteCell = ({ row }: Props) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={() => {
        window.confirm("Are you sure you want to delete this todo?") &&
          startTransition(() => deleteTodo(row.original.id));
      }}
    >
      {isPending ? (
        <Loader className="animate-spin h-5 w-5" />
      ) : (
        <Trash2 className="h-5 w-5" />
      )}
    </Button>
  );
};
