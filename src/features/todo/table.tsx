"use client";
import { DataTable } from "@/components/ui/data-table";
import { FragmentType, getFragmentData, graphql } from "@/gql";
import { useMemo } from "react";
import { makeTodoTableColumns, todoFragmentDoc } from "./tableColumns";

const doc = graphql(`
  fragment TodoTable on Query {
    todos {
      ...TodoTableTodo
    }
    ...MakeTodoTableColumns
  }
`);

type Props = {
  fragmentType: FragmentType<typeof doc>;
};

export const TodoTable = ({ fragmentType }: Props) => {
  const fragment = getFragmentData(doc, fragmentType);
  const todos = getFragmentData(todoFragmentDoc, fragment.todos);

  const columns = useMemo(
    () => makeTodoTableColumns({ fragmentType: fragment }),
    [fragment]
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
