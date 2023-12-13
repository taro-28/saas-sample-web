import { PageTitle } from "@/components/PageTitle";
import { CreateTodoForm } from "@/features/todo/CreateForm";
import { gqlRequest } from "@/functions/gqlRequest";
import { Todo } from "@/gql/graphql";
import { DataTable } from "../components/ui/data-table";
import { todoTableColumns } from "../features/todo/tableColumns";

const query = /* GraphQL */ `
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
  const { data } = (await gqlRequest({ query })) as { data: { todos: Todo[] } };

  return (
    <div className="w-full space-y-4">
      <PageTitle>Todo</PageTitle>
      <CreateTodoForm />
      <DataTable
        columns={todoTableColumns}
        data={data.todos}
        hiddenColumns={["id"]}
        initialSorting={[
          { id: "done", desc: false },
          { id: "createdAt", desc: true },
        ]}
      />
    </div>
  );
}
