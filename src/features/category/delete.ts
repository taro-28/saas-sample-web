"use server";
import { getGqlClient } from "@/functions/gqlRequest";
import { graphql } from "@/gql";
import { revalidatePath } from "next/cache";

const doc = graphql(`
mutation deleteCategory($id: ID!) {
  deleteCategory(id: $id)
}
`);

export const deleteCategory = async (id: string) => {
  (await getGqlClient()).request(doc, { id });
  revalidatePath("/");
};
