"use client";
import { Button } from "@/components/ui/button";
import { graphql } from "@/gql";
import { CategoryTableCategoryFragment } from "@/gql/graphql";
import type { ColumnDef } from "@tanstack/react-table";
import { Loader, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteCategory } from "./delete";

export const categoryFragmentDoc = graphql(`
  fragment CategoryTableCategory on Category {
    id
    name
    createdAt
  }
`);

export const categoryTableColumns: ColumnDef<CategoryTableCategoryFragment>[] =
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
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
            onClick={() =>
              startTransition(() => deleteCategory(row.original.id))
            }
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
