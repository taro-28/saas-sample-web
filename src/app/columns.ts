import { TODO } from "@/features/todo/type";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TODO>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
];
