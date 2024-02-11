import { PageTitle } from "@/components/PageTitle";
import { DataTable } from "@/components/ui/data-table";
import {
  categoryFragmentDoc,
  categoryTableColumns,
} from "@/features/category/tableColumns";
import { getGqlClient } from "@/functions/gqlRequest";
import { getFragmentData, graphql } from "@/gql";

const query = graphql(`
  query CategoryPage {
    categories {
      ...CategoryTableCategory
    }
  }
`);

export default async function Home() {
  const queryResult = await (await getGqlClient()).request(query);
  const categories = getFragmentData(
    categoryFragmentDoc,
    queryResult.categories
  );
  return (
    <div className="w-full space-y-4">
      <PageTitle>Category</PageTitle>
      <DataTable
        columns={categoryTableColumns}
        data={categories}
        hiddenColumns={["id"]}
        initialSorting={[{ id: "createdAt", desc: false }]}
      />
    </div>
  );
}
