import { PageTitle } from "@/components/PageTitle";
import { CreateTodoForm } from "@/features/todo/CreateForm";
import { TodoTable } from "@/features/todo/table";
import { getGqlClient } from "@/functions/gqlRequest";
import { graphql } from "@/gql";

const doc = graphql(`
  query TodoPage {
    ...CreateTodoForm
    ...TodoTable
  }
`);

export default async function Home() {
  const queryResult = await (await getGqlClient()).request(doc);

  return (
    <div className="w-full space-y-4">
      <PageTitle>Todo</PageTitle>
      <CreateTodoForm fragmentType={queryResult} />
      <TodoTable fragmentType={queryResult} />
    </div>
  );
}
