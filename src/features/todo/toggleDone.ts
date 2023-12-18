"use server";

import { getGqlClient } from "@/functions/gqlRequest";
import { revalidatePath } from "next/cache";

/* GraphQL */ `
mutation toggleDoneTodo($id: ID!, $done: Boolean!) {
  updateTodo(input: { id: $id, done: $done }){
    id
  }
}
`;

export const toggleTodoDone = async (id: string, done: boolean) => {
  (await getGqlClient()).toggleDoneTodo({ id, done });
  revalidatePath("/");
};
