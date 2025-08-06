import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

ModuleRegistry.registerModules([AllCommunityModule]);

function BookTable({ books, onDelete }) {
  const columns = useMemo(
    () => [
      { field: "title", sortable: true, filter: true },
      { field: "author", sortable: true, filter: true },
      { field: "isbn", sortable: true, filter: true },
      { field: "price", sortable: true, filter: true },
      { field: "year", sortable: true, filter: true },
      {
        field: "",
        headerName: "Actions",
        cellRenderer: (params) => (
          <Tooltip title="Delete book">
            <IconButton color="error" onClick={() => onDelete(params.data.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    [onDelete]
  );

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "1210px" }}>
      <AgGridReact
        rowData={books}
        columnDefs={columns}
        getRowId={(params) => params.data.id}
        modules={[AllCommunityModule]}
      />
    </div>
  );
}

export default BookTable;
