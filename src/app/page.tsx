import { PageTitle } from "@/components/PageTitle";
import { CreateTodoForm } from "@/features/todo/CreateForm";
import { getGqlClient } from "@/functions/gqlRequest";
import { DataTable } from "../components/ui/data-table";
import { todoTableColumns } from "../features/todo/tableColumns";

/* GraphQL */ `
  query TodoPage {
    todos {
      id
      content
      done
      createdAt
    }
  }
`;

export default async function Home() {
  const { todos } = await (await getGqlClient()).TodoPage();

  return (
    <div className="w-full space-y-4">
      <PageTitle>Todo</PageTitle>
      <CreateTodoForm />
      <DataTable
        columns={todoTableColumns}
        data={todos}
        hiddenColumns={["id"]}
        initialSorting={[
          { id: "done", desc: false },
          { id: "createdAt", desc: true },
        ]}
      />
    </div>
  );
}
