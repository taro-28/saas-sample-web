"use client";
import { DataTable } from "@/components/ui/data-table";
import { FragmentType, getFragmentData, graphql } from "@/gql";
import { useMemo } from "react";
import { makeTodoTableColumns, todoFragmentDoc } from "./tableColumns";

const fragment = graphql(`
  fragment TodoTable on Query {
    todos {
      ...TodoTableTodo
    }
    ...MakeTodoTableColumns
  }
`);

type Props = {
  fragmentType: FragmentType<typeof fragment>;
};

export const TodoTable = ({ fragmentType }: Props) => {
  const fragmentData = getFragmentData(fragment, fragmentType);
  const todos = getFragmentData(todoFragmentDoc, fragmentData.todos);

  const columns = useMemo(
    () => makeTodoTableColumns({ fragmentType: fragmentData }),
    [fragmentData],
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
