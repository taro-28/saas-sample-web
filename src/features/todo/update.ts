"use server";
import { getGqlClient } from "@/functions/gqlRequest";
import { graphql } from "@/gql";
import { UpdateTodoInput } from "@/gql/graphql";
import { revalidatePath } from "next/cache";

const doc = graphql(`
mutation updateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input){
    id
  }
}
`);

export const updateTodo = async (input: UpdateTodoInput) => {
  await (await getGqlClient()).request(doc, { input });
  revalidatePath("/");
};
