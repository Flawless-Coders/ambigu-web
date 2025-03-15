import { DataGrid } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import CheckIcon from "@mui/icons-material/Check";

const columns = (onEdit, onCStatus) => [
  { field: "numeral", headerName: "#", flex: 0.5, headerAlign: "center", align: "center" },
  { field: "id", headerName: "ID", hideable: false, width: 0, flex: 0 },
  { field: "name", headerName: "NOMBRE COMPLETO", flex: 2, headerAlign: "center", align: "center" },
  { field: "email", headerName: "CORREO", flex: 2, headerAlign: "center", align: "center" },
  { field: "phone", headerName: "TELÉFONO", flex: 1, headerAlign: "center", align: "center" },
  { field: "status", headerName: "ESTADO", flex: 1, headerAlign: "center", align: "center" },
  {
    field: "actions",
    headerName: "ACCIONES",
    flex: 1.5,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
    <Box display="flex" justifyContent="center" width="100%">
      <Button size="small" color="secondary" onClick={() => onEdit(params.row)}>
      <EditIcon />
      </Button>
      <Button size="small" color={params.row.status ? "error" : "success"} onClick={() => onCStatus(params.row)}>
      {params.row.status ? <DeleteIcon /> : <CheckIcon />}
      </Button>
      <Button size="small" color="warning">
      <GroupIcon />
      </Button>
    </Box>
    ),
  },
  ];

export default function WaitersTable({ rows, onEdit, onCStatus }) {
  const columns1 = columns(onEdit, onCStatus);
  return <DataGrid 
          initialState={{
            pageSize: 5,
            rowsPerPageOptions: [5, 10],
            pagination: true,
            columns: {
              columnVisibilityModel: {
                id: false,
                status: false,
              }
            }
          }}
          rows={rows} 
          columns={columns1} 
           />;
}
