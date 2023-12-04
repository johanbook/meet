import { ReactElement } from "react";

import { JournalEntryDetails } from "src/api";
import { ProfileAvatar } from "src/components/ProfileAvatar";
import { Table } from "src/components/ui";
import { Column } from "src/components/ui/Table";
import { format } from "src/utils/string";

const columns: Column<JournalEntryDetails>[] = [
  {
    field: "commandName",
    headerName: "Action",
    valueGetter: ({ value }) => format(value || ""),
    width: 400,
  },
  {
    field: "createdAt",
    headerName: "Date",
    valueGetter: ({ value }) => value.toLocaleString(),
    width: 400,
  },
  {
    field: "profile",
    headerName: "Profile",
    renderCell: ({ value }) => (
      <ProfileAvatar name={value.name} src={value.imageUrl} />
    ),
    width: 400,
  },
];

interface OrganizationJournalPageComponentProps {
  data: JournalEntryDetails[];
  loading?: boolean;
}

export function OrganizationJournalPageComponent({
  data,
  loading,
}: OrganizationJournalPageComponentProps): ReactElement {
  return (
    <Table
      columns={columns}
      height="60vh"
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
