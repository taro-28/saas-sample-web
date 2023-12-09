"use client";
import { Button } from "@/components/ui/button";
import { deleteTodo } from "@/features/todo/delete";
import { TODO } from "@/features/todo/type";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, CircleDashed, Trash2 } from "lucide-react";
import { toggleTodoDone } from "./toggleDone";

export const todoTableColumns: ColumnDef<TODO>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "done",
    header: "Done",
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleTodoDone(row.original.id, !row.original.done)}
        >
          {row.original.done ? (
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
    id: "delete",
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteTodo(row.original.id)}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      );
    },
  },
];
