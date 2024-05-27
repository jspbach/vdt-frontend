import { Member, columns, CreateMemberButton } from "./column"
import { DataTable } from "./data-table"

async function getData(): Promise<Member[]> {
  // Fetch data from your API here.

  const response = await fetch('http://apiserver:8080/api/members/', { cache: 'no-store' });
  const data = await response.json();

  return data.map((item: any) => ({
    full_name: item.full_name,
    gender: item.gender,
    institution: item.institution,
    unique_id: item.unique_id,
  }));
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
          <h1 className="title">VDT Cloud 2024 Cohort</h1>
      </div>
      <div>
        <CreateMemberButton />
      </div>
      <div className="container mx-auto py-10 flex flex-col-reverse" style={{ height: '100%' }}>
          <DataTable columns={columns} data={data} />
      </div>
    </main>
  )
}
