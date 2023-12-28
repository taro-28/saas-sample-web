import { PageTitle } from "@/components/PageTitle";
import { DataTable } from "@/components/ui/data-table";
import { categoryTableColumns } from "@/features/category/tableColumns";
import { getGqlClient } from "@/functions/gqlRequest";

/* GraphQL */ `
query CategoryPage {
    ...CategoryTable
}
`;

export default async function Home() {
  const { categories } = await (await getGqlClient()).CategoryPage();
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
