"use server";
import { getGqlClient } from "@/functions/gqlRequest";
import { graphql } from "@/gql";
import { revalidatePath } from "next/cache";

const doc = graphql(`
mutation deleteTodo($id: ID!) {
  deleteTodo(id: $id)
}
`);

export const deleteTodo = async (id: string) => {
  (await getGqlClient()).request(doc, { id });
  revalidatePath("/");
};
