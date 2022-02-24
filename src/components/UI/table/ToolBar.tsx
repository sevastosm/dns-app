import React, { useEffect } from "react";
import { Button } from "@mui/material";

type Props = {
  selectedRow: any;
  addRowCallback: (event: React.MouseEvent<unknown>) => void;
  edditRowCallback: (event: React.MouseEvent<unknown>, edit: boolean) => void;
  saveRowCallback: (event: React.MouseEvent<unknown>) => void;
  deleteRowCallBack: (event: React.MouseEvent<unknown>) => void;

  add: boolean;
  addRow: boolean;
  editRow: boolean;
};

export default function ToolBar({
  add,
  selectedRow,
  addRowCallback,
  edditRowCallback,
  saveRowCallback,
  deleteRowCallBack,
  addRow,
  editRow,
}: Props) {
  console.log("selectedRow", selectedRow);
  console.log("editRow", editRow);

  // const [row, setRow] = React.useState(selectedRow);

  const handleSave = () => false;

  // useEffect(() => {
  //   setRow(selectedRow);
  // }, [selectedRow]);

  return (
    <div style={{ display: "flex" }}>
      {add && (
        <div style={{ margin: "20px 0" }}>
          <Button variant="contained" color="primary" onClick={addRowCallback}>
            {addRow ? "ΑΚΥΡΩΣΗ" : "+"}
          </Button>
        </div>
      )}
      {selectedRow && (
        <div style={{ margin: "20px 0" }}>
          {editRow && selectedRow.editMode ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => edditRowCallback(e, false)}
              >
                "ΑΚΥΡΩΣΗ"
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => edditRowCallback(e, true)}
            >
              "EDIT"
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={deleteRowCallBack}
          >
            Delete
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
