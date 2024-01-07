"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ArrowUpDown, MoveDown, MoveUp } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  hiddenColumns?: (keyof TData)[];
  initialSorting?: SortingState;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  hiddenColumns = [],
  initialSorting = [],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      columnVisibility: Object.fromEntries(
        hiddenColumns.map((key) => [key, false])
      ),
      sorting,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-2">
      <Input
        className="max-w-sm"
        onChange={(e) => setGlobalFilter(String(e.target.value))}
        placeholder="Search..."
        value={globalFilter ?? ""}
      />
      <div className="rounded-md border">
        <Table className="rounded-md border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(canSort && "cursor-pointer")}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {(() => {
                          if (!canSort) {
                            return null;
                          }

                          const className = "w-4 h-4 ml-1";
                          switch (header.column.getIsSorted()) {
                            case "asc":
                              return <MoveUp className={className} />;
                            case "desc":
                              return <MoveDown className={className} />;
                            default:
                              return <ArrowUpDown className={className} />;
                          }
                        })()}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end">
        <div className="flex-1 text-muted-foreground">
          {table.getFilteredRowModel().rows?.length ?? 0} rows
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="space-x-2">
            <Button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
