"use client";
import { Button } from "@/components/ui/button";
import { deleteTodo } from "@/features/todo/deleteTodo";
import { TODO } from "@/features/todo/type";
import { ColumnDef } from "@tanstack/react-table";
import { Trash, Trash2, Trash2Icon, TrashIcon } from "lucide-react";

export const columns: ColumnDef<TODO>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "done",
    header: "Done",
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
