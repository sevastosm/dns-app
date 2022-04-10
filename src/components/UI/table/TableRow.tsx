import { TableRow, TableCell, TextField } from "@mui/material";
import ComboBox from "../AutoComplete";
import { IconButton } from "@mui/material";
import { SaveRounded } from "@mui/icons-material/";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";

import React from "react";

type Props = {
  data: any;
  handleRowClick: any;
  selectedRow: any;
  maxCols: any;
  headCells: any;
  index: number;
  setEditedRow: any;
  onRowDelete: any;
  onRowEdit: any;
  editModeIndex: any;
  handleSaveRow: any;
};

export default function TableRows({
  data,
  handleRowClick,
  selectedRow,
  editModeIndex,
  maxCols,
  headCells,
  index,
  setEditedRow,
  handleSaveRow,
  onRowDelete,
  onRowEdit,
}: Props) {
  const [row, setRow] = React.useState<any>([]);

  const handleRowEdit = (event: any) => {
    // handleRowClick(e, row);
    event.preventDefault();
    onRowEdit(row, index);
  };
  const handleRowEditCancel = (event: any) => {
    // handleRowClick(e, row);
    event.preventDefault();
    setRow(data);
    onRowEdit(row, null);
  };

  const handleRowDelete = (event: any) => {
    // handleRowClick(e, row);
    event.preventDefault();
    onRowDelete(row);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    console.log("EEE", e);
    setRow({ ...selectedRow, [e.target.name]: e.target.value });
  };
  const handleChange2 = (e: any, name: string) => {
    e.preventDefault();
    console.log("EEE", e);
    setRow({ ...selectedRow, [name]: e.target.innerHTML });
  };

  React.useEffect(() => {
    console.log("DATA", data);

    setRow(data);
  }, [data, selectedRow]);

  const selected = selectedRow ? row.id === selectedRow.id : false;
  const isOnEditMode = editModeIndex === index;

  return (
    <TableRow
      hover
      onClick={(event) => handleRowClick(event, row)}
      tabIndex={-1}
      key={index}
      selected={selected}
    >
      <TableCell>
        {" "}
        {isOnEditMode ? (
          <div
            style={{
              display: "flex",
            }}
          >
            <IconButton onClick={(e) => handleRowEditCancel(e)}>
              <CancelIcon />
            </IconButton>
            <IconButton onClick={() => handleSaveRow(row, index)}>
              <SaveRounded />
            </IconButton>
          </div>
        ) : (
          <>
            <IconButton onClick={(e) => handleRowEdit(e)}>
              <ModeEditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={handleRowDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </TableCell>
      {Object.keys(row).map((r: string, i: number) => {
        let data: any = row[r as keyof typeof row];
        return (
          i < maxCols &&
          headCells.some((e: any) => e.id === r) &&
          (isOnEditMode ? (
            <TableCell key={i}>
              {r === "competitionAr" ||
              r === "ocupationID" ||
              r === "argoPaySpotID" ? (
                <ComboBox onChange={handleChange2} name={r} />
              ) : (
                <TextField
                  name={r}
                  key={i}
                  id="standard-basic"
                  // label={data}
                  defaultValue={data}
                  variant="standard"
                  onChange={handleChange}
                />
              )}
            </TableCell>
          ) : (
            <>
              <TableCell key={i}>
                <span>{data}</span>
              </TableCell>
            </>
          ))
        );
      })}
      {/* {clearCell && (
          <TableCell key={`${index}-cancel`}>
            <CancelIcon
              color="error"
              onClick={() => handleRemoveOrder(index)}
            />
          </TableCell>
        )} */}
    </TableRow>
  );
}
