import { TableRow, TableCell, TextField } from "@mui/material";
import ComboBox from "../AutoComplete";

import React from "react";

type Props = {
  data: any;
  handleRowClick: any;
  selectedRow: any;
  maxCols: any;
  headCells: any;
  index: number;
  setEditedRow: any;
};

export default function TableRows({
  data,
  handleRowClick,
  selectedRow,
  maxCols,
  headCells,
  index,
  setEditedRow,
}: Props) {
  const [row, setRow] = React.useState<any>([]);

  const handleChange = (e: any) => {
    e.preventDefault();
    console.log("EEE", e);
    setEditedRow({ ...selectedRow, [e.target.name]: e.target.value });
  };
  const handleChange2 = (e: any, name: string) => {
    e.preventDefault();
    console.log("EEE", e);
    setEditedRow({ ...selectedRow, [name]: e.target.innerHTML });
  };

  React.useEffect(() => {
    setRow(data);
  }, [data, selectedRow]);

  const selected = selectedRow ? row.id === selectedRow.id : false;

  return (
    <TableRow
      hover
      onClick={(event) => handleRowClick(event, row)}
      tabIndex={-1}
      key={index}
      selected={selected}
    >
      {Object.keys(row).map((r: string, i: number) => {
        let data: any = row[r as keyof typeof row];
        return (
          i < maxCols &&
          headCells.some((e: any) => e.id === r) &&
          (row.editMode && selected ? (
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
            <TableCell key={i}>
              <span>{data}</span>
            </TableCell>
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
