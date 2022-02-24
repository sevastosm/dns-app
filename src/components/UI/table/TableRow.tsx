import { TableRow, TableCell, TextField } from "@mui/material";

import React from "react";

type Props = {
  data: any;
  handleRowClick: any;
  selectedRow: any;
  maxCols: any;
  headCells: any;
  index: number;
};

export default function TableRows({
  data,
  handleRowClick,
  selectedRow,
  maxCols,
  headCells,
  index,
}: Props) {
  const [row, setRow] = React.useState<any>([]);

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
              <TextField
                name={r}
                key={i}
                id="standard-basic"
                // label={data}
                defaultValue={data}
                variant="standard"
              />
            </TableCell>
          ) : (
            <TableCell key={i}>{data}</TableCell>
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
