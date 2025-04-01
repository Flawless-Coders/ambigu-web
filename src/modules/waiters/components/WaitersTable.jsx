import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, Chip, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

const useStyles = makeStyles({
  leaderRow: {
    backgroundColor: 'rgba(21, 167, 82, 0.29)',
  }
});

const columns = (onEdit, onCStatus, onCLeader, classes) => [
  { field: "id", headerName: "ID", width: 0, flex: 0 },
  { field: "name", headerName: "NOMBRE COMPLETO", flex: 2, headerAlign: "center", align: "center", renderCell: (params) => (
    <Box display="flex" alignItems="center" justifyContent="center">
      {params.row.name}
      {params.row.leader && <Chip label="Líder" size="small" sx={{ bgcolor: 'primary.main', color: 'white', ml: 2 }} />}
    </Box>
  ) },
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
  const columnsConfig = columns(onEdit, onCStatus, onCLeader, classes);
  const { searchTerm } = useOutletContext();
  const [alignment, setAlignment] = useState("active");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const iconStyle = { marginLeft: 1};

  const filteredRows = rows.filter(row => {
    // First filter by active/inactive status
    const matchesStatus = alignment === "active" ? row.status : !row.status;
    
    // If no search term, just return the status filter
    if (!searchTerm) return matchesStatus;
    
    // If there is a search term, apply it only to rows that match the status
    return matchesStatus && (
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (row.phone && row.phone.includes(searchTerm))
    );
  });

  return (
    <>
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'end' }}>
    <ToggleButtonGroup
      color={alignment === "active" ? "primary" : "error"}
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="active-inactive waiters"
    >
      <ToggleButton value="active">
        Activos{alignment === "active" ? <CheckCircleIcon sx={iconStyle}/> : <CheckCircleOutlinedIcon sx={iconStyle}/>}
      </ToggleButton>
      <ToggleButton value="inactive">
        Inactivos{alignment === "inactive" ? <CancelIcon sx={iconStyle}/> : <CancelOutlinedIcon sx={iconStyle}/>}
      </ToggleButton>
    </ToggleButtonGroup>
    </Box>
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
    </>
  );
}
