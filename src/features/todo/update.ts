"use server";
import { getGqlClient } from "@/functions/gqlRequest";
import type { UpdateTodoInput } from "@/gql/generated";
import { revalidatePath } from "next/cache";

`#graphql
mutation updateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input){
    id
  }
}
`;

export const updateTodo = async (input: UpdateTodoInput) => {
  await (await getGqlClient()).updateTodo({ input });
  revalidatePath("/");
};
