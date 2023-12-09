import { PageTitle } from "@/components/PageTitle";
import { CreateTodoForm } from "@/features/todo/CreateTodoForm";
import { TODO } from "@/features/todo/type";
import { gqlRequest } from "@/functions/gqlRequest";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Home() {
  const { data } = (await gqlRequest({
    query: "query {todos {id content done}}",
  })) as { data: { todos: TODO[] } };

  return (
    <div className="w-full space-y-4">
      <PageTitle>Todo</PageTitle>
      <CreateTodoForm />
      <DataTable columns={columns} data={data.todos} />
    </div>
  );
}
