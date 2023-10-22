import { ReactElement } from "react";

import Box from "@mui/material/Box";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

import { TableNoData } from "./TableNoData";

interface TableProps extends DataGridProps {
  height?: number | string;
}

export function Table({
  columns,
  height = 400,
  rows,
  ...props
}: TableProps): ReactElement {
  return (
    <Box sx={{ height, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        slots={{
          noRowsOverlay: TableNoData,
        }}
        {...props}
      />
    </Box>
  );
}
