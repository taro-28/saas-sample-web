import { PageTitle } from "@/components/PageTitle";
import { DataTable } from "@/components/ui/data-table";
import {
  categoryFragmentDoc,
  categoryTableColumns,
} from "@/features/category/tableColumns";
import { getGqlClient } from "@/functions/gqlRequest";
import { getFragmentData, graphql } from "@/gql";

const doc = graphql(`
  query CategoryPage {
    categories {
      ...CategoryTableCategory
    }
  }
`);

export default async function Home() {
  const query = await (await getGqlClient()).request(doc);
  const categories = getFragmentData(categoryFragmentDoc, query.categories);
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
