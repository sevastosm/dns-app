import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useMutationObserver } from "./useMutationObserver";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

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
  {
    field: "actions",
    headerName: "Actions",
    width: 110,
    editable: false,
    renderEditCell: () => <Button>Save</Button>,
  },
];

const data = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
];
let rowAdded = false;
function DataGridDemo() {
  const [rows, setRows] = React.useState<any>(data);
  const [selectedRow, setSelectedRow] = React.useState<any>(data);

  const [newRowDialog, setNewRowDialod] = React.useState<boolean>(false);
  const customBtn = (params: any) => {
    const ddd = params.api.state.editRows[params.id];
    return (
      <Button
        onClick={() => {
          console.log("PARAMS", ddd);
        }}
      >
        Save
      </Button>
    );
  };

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
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderEditCell: customBtn,
      editable: true,

      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 110,
    //   editable: false,
    // },
  ];

  const handleSelect = (d: any) => {
    // setSelectedRow(d);
    // console.log("Selected-row", d.getValue());
  };

  const id = "id" + new Date().getTime();
  const fields = { id: id, username: null, age: null };

  // const handleAddRow = () => {
  //   setNewRowDialod(true);
  // };
  const createNewRow = () => {
    var id = "id" + new Date().getTime();
    return { id: id, username: null, age: null };
  };
  const handleAddRow = () => {
    rowAdded = true;

    setRows((prevRows: any) => [...prevRows, createNewRow()]);
  };

  const tableElement = (target: any) => {
    // const target: any = document.querySelectorAll(
    //   ".MuiDataGrid-virtualScrollerRenderZone"
    // );
    console.log("target", target.lastElementChild);
    const lastElement: any = target.lastChild;

    console.log("lastElement", lastElement);

    var event = new MouseEvent("dblclick", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    lastElement.children[1].dispatchEvent(event);
    rowAdded = false;
  };
  const ref: any = React.useRef(null);

  const handleMutations = React.useCallback((mutations) => {
    mutations.forEach(
      ({
        type,
        target,
      }: {
        type: MutationRecordType;
        target: Element | null;
      }) => {
        if (type === "childList") {
          tableElement(target);
        }
      }
    );
  }, []);

  useMutationObserver({
    target: document.querySelector(".MuiDataGrid-virtualScrollerRenderZone "),
    options: { childList: true },
    callback: handleMutations,
  });

  const updateRows = (s: any, e: any) => {
    const lallala = s.getValue(s.id);
    console.log("DSFSDFSDf", lallala);
    if (e.key === "Enter") {
      e.defaultMuiPrevented = true;
    }

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
        ref={ref}
        rows={rows}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        onRowClick={handleSelect}
        onEditRowsModelChange={updateRows}
        // onRowEditCommit={updateRows}
        editMode="row"
      />
      {/* <NewRowDialog
        isOpen={newRowDialog}
        callback={newRowCallback}
        fields={fields}
      /> */}
    </div>
  );
}

export default function DataTable({ data, columns }: any) {
  return (
    <>
      <DataGridDemo />
      {JSON.stringify(data)}
    </>
  );
}
