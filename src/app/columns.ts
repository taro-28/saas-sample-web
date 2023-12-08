"use client";

import { TODO } from "@/features/todo";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TODO>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "text",
    header: "Text",
  },
];