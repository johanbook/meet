import { ReactElement } from "react";

import { JournalEntryDetails } from "src/api";
import { Table } from "src/components/ui";
import { Column } from "src/components/ui/Table";
import { format } from "src/utils/string";

const columns: Column<JournalEntryDetails>[] = [
  {
    field: "commandName",
    headerName: "Action",
    valueGetter: (value) => format(value || ""),
    width: 300,
  },
  {
    field: "createdAt",
    headerName: "Date",
    valueGetter: (value: string) => value.toLocaleString(),
    width: 200,
  },
];

interface ProfileJournalPageComponentProps {
  data: JournalEntryDetails[];
  loading?: boolean;
}

export function ProfileJournalPageComponent({
  data,
  loading,
}: ProfileJournalPageComponentProps): ReactElement {
  return (
    <Table
      columns={columns}
      height="65vh"
      initialState={{
        sorting: {
          sortModel: [{ field: "created", sort: "desc" }],
        },
      }}
      loading={loading}
      rows={data}
    />
  );
}
