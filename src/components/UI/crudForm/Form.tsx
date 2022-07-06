import { Box, Button, IconButton, TextField } from "@mui/material";
import SaveRounded from "@mui/icons-material/SaveRounded";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";

import * as React from "react";

export interface IAppProps {
  data: any;
  fields: any;
}

export default function Form({ data, fields }: IAppProps) {
  console.log("Form", fields);
  console.log("Form-data", data);

  const [editMode, setEditMode] = React.useState(false);
  const [addMode, setAddMode] = React.useState(false);
  const [values, setValues] = React.useState<any>([]);

  const handleAdd = () => {
    setValues(fields);
    setAddMode(true);
  };

  const handleChange = (e: any, index: any) => {
    e.preventDefault();

    const ddd = values.map((d: any, i: number) =>
      index === i ? { ...d, value: e.target.value } : { ...d }
    );

    setValues(ddd);
  };

  React.useEffect(() => {
    setValues(data);
  }, [data]);

  // React.useEffect(() => {
  //   console.log("values", values);
  // });

  let isReadOnly = true;

  if (editMode) {
    isReadOnly = false;
  }
  if (addMode) {
    isReadOnly = false;
  }

  if (data.length === 0 && !addMode)
    return (
      <>
        <div>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            <AddIcon />
          </Button>
        </div>
        <h3>Δεν βρέθηκαν εγγραφές</h3>
      </>
    );
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, minWidth: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      {values.map((d: any, index: number) => (
        <TextField
          key={`field-${d.id}`}
          name={d.name}
          value={d.value}
          id={d.id}
          label={d.name}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => handleChange(e, index)}
          InputProps={{
            readOnly: !editMode,
          }}
        />
      ))}
      <div>
        {editMode || addMode ? (
          <div
            style={{
              display: "flex",
            }}
          >
            <IconButton onClick={(e) => setEditMode(false)}>
              <CancelIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={(e) => setEditMode(false)}>
              <SaveRounded fontSize="large" />
            </IconButton>
          </div>
        ) : (
          <>
            <IconButton onClick={(e) => setEditMode(true)}>
              <ModeEditIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={() => false}>
              <DeleteIcon fontSize="large" />
            </IconButton>
          </>
        )}
      </div>
    </Box>
  );
}
