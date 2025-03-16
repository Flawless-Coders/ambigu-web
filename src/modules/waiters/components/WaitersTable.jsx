import { DataGrid } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import CheckIcon from "@mui/icons-material/Check";
import { useOutletContext } from "react-router-dom";

const useStyles = makeStyles({
  leaderRow: {
    backgroundColor: 'rgba(21, 167, 82, 0.29)',
  }
});

const columns = (onEdit, onCStatus, onCLeader) => [
  { field: "id", headerName: "ID", width: 0, flex: 0 },
  { field: "name", headerName: "NOMBRE COMPLETO", flex: 2, headerAlign: "center", align: "center" },
  { field: "email", headerName: "CORREO", flex: 2, headerAlign: "center", align: "center" },
  { field: "phone", headerName: "TELÉFONO", flex: 1, headerAlign: "center", align: "center" },
  { field: "status", headerName: "ESTADO", flex: 1, headerAlign: "center", align: "center" },
  { field: "leader", headerName: "LÍDER", flex: 1, headerAlign: "center", align: "center" },
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
        {!params.row.leader && (
          <>
            <Button size="small" color={params.row.status ? "error" : "success"} onClick={() => onCStatus(params.row)}>
              {params.row.status ? <DeleteIcon /> : <CheckIcon />}
            </Button>
            <Button size="small" color="warning" onClick={() => onCLeader(params.row)}>
              <GroupIcon />
            </Button>
          </>
        )}
      </Box>
    ),
  },
];

export default function WaitersTable({ rows, onEdit, onCStatus, onCLeader }) {
  const classes = useStyles();
  const columnsConfig = columns(onEdit, onCStatus, onCLeader);
  const { searchTerm } = useOutletContext();

  const filteredRows = rows.filter(row => 
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.phone.includes(searchTerm)
  );

  return (
    <DataGrid
      rows={filteredRows}
      columns={columnsConfig}
      pageSizeOptions={[5, 10, 15, 20]} // Opciones de tamaño de página en incrementos de 5
      pagination
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10 }, // Tamaño de página inicial de 10
        },
        columns: {
          columnVisibilityModel: {
            id: false,
            status: false,
            leader: false,
          },
        },
        sorting:{
          sortModel: [{ field: 'leader', sort: 'desc' }]  
        }
      }}
      getRowClassName={(params) => (params.row.leader ? classes.leaderRow : '')}
    />
  );
}
