import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { SaveRounded } from "@mui/icons-material/";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  selectedRow: any;
  addRowCallback: (event: React.MouseEvent<unknown>) => void;
  // edditRowCallback: (event: React.MouseEvent<unknown>, edit: boolean) => void;
  // saveRowCallback: (event: React.MouseEvent<unknown>) => void;
  // deleteRowCallBack: (event: React.MouseEvent<unknown>) => void;

  add: boolean;
  addRow: boolean;
  editRow: boolean;
};

export default function ToolBar({
  add,
  selectedRow,
  addRowCallback,

  addRow,
  editRow,
}: Props) {
  return (
    <div style={{ display: "flex" }}>
      {add && (
        <div style={{ margin: "20px 30px" }}>
          <Button variant="contained" color="primary" onClick={addRowCallback}>
            {addRow ? <CancelIcon /> : <AddIcon />}
          </Button>
        </div>
      )}

      {/* useEffect(() => {
    const results = data.filter(o => o.keywords.includes(searchTerm));
    setSearchResults(results);
  }, [searchTerm]); */}
    </div>
  );
}
