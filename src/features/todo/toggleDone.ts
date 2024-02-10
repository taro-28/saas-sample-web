"use server";

import { getGqlClient } from "@/functions/gqlRequest";
import { revalidatePath } from "next/cache";

`#graphql
mutation updateDoneTodo($id: ID!, $done: Boolean!) {
  updateTodoDone(input: { id: $id, done: $done }){
    id
  }
}
`;

export const updateTodoDone = async (id: string, done: boolean) => {
  (await getGqlClient()).updateDoneTodo({ id, done });
  revalidatePath("/");
};
