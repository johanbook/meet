import type { GridColDef, GridValidRowModel } from "@mui/x-data-grid";

export { Table } from "./Table";

export interface Column<T extends GridValidRowModel>
  extends Omit<GridColDef<T>, "field"> {
  /** Name of field. Original MUI definition is not typed */
  field: keyof T;
}
