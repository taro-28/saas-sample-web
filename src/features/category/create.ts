"use server";

import { getGqlClient } from "@/functions/gqlRequest";
import { revalidatePath } from "next/cache";

/* GraphQL */ `
mutation createCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
      id
    }
}
`;

export const createCategory = async (name: string) => {
  await (await getGqlClient()).createCategory({ input: { name } });
  revalidatePath("/");
};
