import { DataGrid } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";

const columns = (onEdit) => [
    { field: "id", headerName: "#", flex: 0.5, headerAlign: "center", align: "center" },
    { field: "name", headerName: "NOMBRE COMPLETO", flex: 2, headerAlign: "center", align: "center" },
    { field: "email", headerName: "CORREO", flex: 2, headerAlign: "center", align: "center" },
    { field: "phone", headerName: "TELÉFONO", flex: 1, headerAlign: "center", align: "center" },
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
          <Button size="small" color="error">
            <DeleteIcon />
          </Button>
          <Button size="small" color="warning">
            <GroupIcon />
          </Button>
        </Box>
      ),
    },
  ];

export default function WaitersTable({ rows, onEdit }) {
  return <DataGrid rows={rows} columns={columns(onEdit)} pageSizeOptions={[5, 10]} pagination />;
}
