"use server";
import { getGqlClient } from "@/functions/gqlRequest";
import { revalidatePath } from "next/cache";

/* GraphQL */ `
mutation deleteCategory($id: ID!) {
  deleteCategory(id: $id)
}
`;

export const deleteCategory = async (id: string) => {
  (await getGqlClient()).deleteCategory({ id });
  revalidatePath("/");
};
