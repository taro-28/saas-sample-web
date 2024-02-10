"use server";
import { getGqlClient } from "@/functions/gqlRequest";
import { revalidatePath } from "next/cache";

`#graphql
mutation deleteTodo($id: ID!) {
  deleteTodo(id: $id)
}
`;

export const deleteTodo = async (id: string) => {
  (await getGqlClient()).deleteTodo({ id });
  revalidatePath("/");
};
