import { ReactElement } from "react";

import { JournalEntryDetails } from "src/api";
import { Table } from "src/components/ui";
import { Column } from "src/components/ui/Table";
import { format } from "src/utils/string";

const columns: Column<JournalEntryDetails>[] = [
  {
    field: "commandName",
    headerName: "Action",
    valueGetter: (params) => format(params.value || ""),
    width: 400,
  },
  {
    field: "created",
    headerName: "Date",
    valueGetter: (params) => params.value.toLocaleString(),
    width: 400,
  },
];

interface JournalPageComponentProps {
  data: JournalEntryDetails[];
  loading?: boolean;
}

export function JournalPageComponent({
  data,
  loading,
}: JournalPageComponentProps): ReactElement {
  return (
    <Table columns={columns} height="60vh" loading={loading} rows={data} />
  );
}
