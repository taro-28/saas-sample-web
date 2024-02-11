"use server";

import { getGqlClient } from "@/functions/gqlRequest";
import { graphql } from "@/gql";
import { revalidatePath } from "next/cache";

const doc = graphql(`
mutation createCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
      id
    }
}
`);

export const createCategory = async (name: string) => {
  await (await getGqlClient()).request(doc, { input: { name } });
  revalidatePath("/");
};
