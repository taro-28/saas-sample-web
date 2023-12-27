"use client";

import { Button } from "@/components/ui/button";
import { TodoTableTodoFragment } from "@/gql/generated";
import { CellContext } from "@tanstack/react-table";
import { CheckCircle, CircleDashed } from "lucide-react";
import { useOptimistic } from "react";
import { updateTodoDone } from "./toggleDone";

type Props = CellContext<TodoTableTodoFragment, unknown>;

export const TableDoneCell = ({ row: { original: { id, done } } }: Props) => {
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
};