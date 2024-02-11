"use server";

import { getGqlClient } from "@/functions/gqlRequest";
import { graphql } from "@/gql";
import { revalidatePath } from "next/cache";

const doc = graphql(`
mutation updateDoneTodo($id: ID!, $done: Boolean!) {
  updateTodoDone(input: { id: $id, done: $done }){
    id
  }
}
`);

export const updateTodoDone = async (id: string, done: boolean) => {
  (await getGqlClient()).request(doc, { id, done });
  revalidatePath("/");
};
