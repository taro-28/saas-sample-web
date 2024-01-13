"use client";
import { DataTable } from "@/components/ui/data-table";
import type { TodoTableFragment } from "@/gql/generated";
import { useMemo } from "react";
import { makeTodoTableColumns } from "./tableColumns";

/* GraphQL */ `
fragment TodoTable on Query {
  ...MakeTodoTableColumns
}
`;

type Props = TodoTableFragment;

export const TodoTable = ({ todos, categories }: Props) => {
  const columns = useMemo(
    () => makeTodoTableColumns({ categories }),
    [categories],
  );
  return (
    <DataTable
      columns={columns}
      data={todos}
      hiddenColumns={["id"]}
      initialSorting={[
        { id: "done", desc: false },
        { id: "createdAt", desc: true },
      ]}
    />
  );
};
