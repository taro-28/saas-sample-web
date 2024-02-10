import { PageTitle } from "@/components/PageTitle";
import { CreateTodoForm } from "@/features/todo/CreateForm";
import { TodoTable } from "@/features/todo/table";
import { getGqlClient } from "@/functions/gqlRequest";

`#graphql
query TodoPage {
  ...CreateTodoForm
  ...TodoTable
}
`;

export default async function Home() {
  const { todos, categories } = await (await getGqlClient()).TodoPage();
  return (
    <div className="w-full space-y-4">
      <PageTitle>Todo</PageTitle>
      <CreateTodoForm categories={categories} />
      <TodoTable todos={todos} categories={categories} />
    </div>
  );
}
