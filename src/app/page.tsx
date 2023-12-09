import { PageTitle } from "@/components/PageTitle";
import { CreateTodoForm } from "@/features/todo/CreateForm";
import { TODO } from "@/features/todo/type";
import { gqlRequest } from "@/functions/gqlRequest";
import { DataTable } from "../components/ui/data-table";
import { todoTableColumns } from "../features/todo/tableColumns";

export default async function Home() {
  const { data } = (await gqlRequest({
    query: "query {todos {id content done}}",
  })) as { data: { todos: TODO[] } };

  return (
    <div className="w-full space-y-4">
      <PageTitle>Todo</PageTitle>
      <CreateTodoForm />
      <DataTable
        columns={todoTableColumns}
        data={data.todos}
        hiddenColumns={["id"]}
      />
    </div>
  );
}
