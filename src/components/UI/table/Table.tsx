import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import EnhancedTableHead from "./Head";
import ToolBar from "./ToolBar";
import TableRow from "./TableRow";
import { NewRow } from "./NewRow";

import { Data } from "../../../types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Form from "../crudForm/Form";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof Data>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

type TableProps = {
  onRowclick?: (data: any) => void;
  rows: Data[];
  headCells: any;
  name: string;
  clearCell?: boolean;
  maxCols?: number;
  add?: boolean;
  orderCol?: any;
  getRows?: (data: any) => void;
  pagination?: boolean;
  stickyHeader?: boolean;
  selectedRow?: any;
  rowsPerPagenum?: number;
  getPdf?: any;
  rowInfo?: any;
};
let editedRow = {};
export default function DataTable(props: TableProps) {
  const {
    rows,
    headCells,
    clearCell = false,
    maxCols = 100,
    add = false,
    orderCol = "",
    pagination = true,
    stickyHeader,
    getRows = () => null,
    rowsPerPagenum = 25,
    rowInfo = () => false,
  } = props;
  // const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>(orderCol);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPagenum);
  const [selectedRow, setSelectedRow] = React.useState<any>(null);
  const [editModeIndex, setEditModeIndex] = React.useState<any>(null);

  const [tableRows, setRow] = useState(rows);
  const [addRow, setAddwRow] = useState(false);
  const [editRow, setEditRow] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [editedRow, setEditedRow] = React.useState<any>({});

  const setEditedRow = (row: any) => {
    editedRow = row;
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleAddRowClick = (event: React.MouseEvent<unknown>) => {
    event.preventDefault();

    const r: any = {};
    Object.keys(tableRows[0]).map((key: any) => {
      return (r[key] = "");
    });
    const ed = { ...r, editMode: true, id: "id" + new Date().getTime() };

    setRow([...tableRows, ed]);
    setSelectedRow(ed);
    setEditRow(true);
    setEditModeIndex(tableRows.length);

    // setSelectedRow(emptyRow);
    // setEditRow(true);
    // setAddwRow(!addRow);
  };
  const handleEditRow = (row: any, index: any) => {
    const newRow = { ...row };
    setEditModeIndex(index);
    setSelectedRow(newRow);

    // const selectedIndex = tableRows.findIndex((i: any) => i.id === newRow.id);
    // const newData = [...tableRows];
    // newData[selectedIndex] = newRow;
    // setRow(newData);
  };
  const handleSaveRow = (row: any, index: any) => {
    // const selectedIndex = tableRows.findIndex(
    //   (i: any) => i.id === selectedRow.id
    // );
    const newData = [...tableRows];
    newData[index] = row;
    setRow(newData);
    setEditModeIndex(null);
  };

  const handleSaveOrder = (order: any) => {
    tableRows.push(order);
    getRows(tableRows);
    setRow(tableRows);
    setAddwRow(false);
  };

  const handleDeleteRow = (row: any) => {
    const newtableRows = tableRows.filter((i: any) => i.id !== row.id);
    setRow(newtableRows);
    setSelectedRow(null);
    setEditModeIndex(null);
  };

  const handleRowClick = (event: React.MouseEvent<unknown>, row: any) => {
    event.preventDefault();
    // setEditModeIndex(null);

    setSelectedRow(row);
    // setEditRow(row.editMode);
    // onRowclick([row]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!rows) return null;
  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <div>
      <form>
        <span style={{ overflow: "auto", display: "block" }}>
          {/* {JSON.stringify(selectedRow)} */}
        </span>
        <ToolBar
          addRowCallback={handleAddRowClick}
          selectedRow={selectedRow}
          add={add}
          addRow={addRow}
          editRow={editRow}
        />
        <TableContainer>
          <Table
            stickyHeader={stickyHeader}
            // className={classes.table}
            aria-labelledby="tableTitle"
            size={"small"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(tableRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index) => {
                  return (
                    <TableRow
                      data={row}
                      handleRowClick={handleRowClick}
                      handleSaveRow={handleSaveRow}
                      selectedRow={selectedRow}
                      maxCols={maxCols}
                      headCells={headCells}
                      index={index}
                      setEditedRow={setEditedRow}
                      onRowDelete={handleDeleteRow}
                      onRowEdit={handleEditRow}
                      editModeIndex={editModeIndex}
                      onInfoClick={() => setIsDialogOpen(true)}
                    />
                  );
                })}
              {addRow && <NewRow saveOrder={handleSaveOrder} />}

              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </form>
      {selectedRow && (
        <Dialog
          maxWidth="xl"
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        >
          {/* <DialogTitle></DialogTitle> */}
          <DialogContent>{rowInfo(selectedRow)}</DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
