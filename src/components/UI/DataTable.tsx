import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
    renderEditCell: () => <>ddddddddd</>,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const data = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
];

function DataGridDemo() {
  const [rows, setRows] = React.useState<any>(data);

  const handleSelect = (d: any) => {
    console.log("Selected-row", d);
  };
  const createNewRow = () => {
    var id = "id" + new Date().getTime();
    return { id: id, username: null, age: null };
  };
  const handleAddRow = () => {
    setRows((prevRows: any) => [...prevRows, createNewRow()]);
  };

  const updateRows = (s: any) => {
    setRows((prevRows: any) =>
      prevRows.map((r: any) => {
        if (s.id === r.id) {
          return { ...s.row };
        }
        return r;
      })
    );
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      {console.log("ROWS", rows)}
      <Stack
        sx={{ width: "100%", mb: 1 }}
        direction="row"
        alignItems="flex-start"
        columnGap={1}
      >
        {/* <Button size="small" onClick={handleUpdateRow}>
          Update a row
        </Button>
        <Button size="small" onClick={handleUpdateAllRows}>
          Update all rows
        </Button>
        <Button size="small" onClick={handleDeleteRow}>
          Delete a row
        </Button> */}
        <Button size="small" onClick={handleAddRow}>
          Add a row
        </Button>
      </Stack>
      <DataGrid
        // editRowsModel={editRowsModel}
        // onEditRowsModelChange={handleEditRowsModelChange}
        rows={rows}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onRowClick={handleSelect}
        onRowEditStop={updateRows}
        // setRows((prevRows: any) => {

        // })}}

        editMode="row"
      />
    </div>
  );
}

export default function DataTable({ data, columns }: any) {
  return (
    <>
      DATA
      <br />
      <DataGridDemo />
      {JSON.stringify(data)}
    </>
  );
}
