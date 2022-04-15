import { Box, IconButton, TextField } from "@mui/material";
import SaveRounded from "@mui/icons-material/SaveRounded";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import * as React from "react";

export interface IAppProps {
  data: any;
}

export default function Form({ data }: IAppProps) {
  console.log("Form", data);

  const [editMode, setEditMode] = React.useState(false);

  if (data.length === 0) return <>Δεν βρέθηκαν εγγραφές</>;

  const Datafields = () => {
    return data.map((d: any) => (
      <TextField
        key={d.id}
        name={d.name}
        value={d.value}
        id={d.id}
        label={d.name}
        // focused
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
    ));
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, minWidth: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Datafields />
      <div>
        {editMode ? (
          <div
            style={{
              display: "flex",
            }}
          >
            <IconButton onClick={(e) => false}>
              <CancelIcon />
            </IconButton>
            <IconButton onClick={() => false}>
              <SaveRounded />
            </IconButton>
          </div>
        ) : (
          <>
            <IconButton onClick={(e) => false}>
              <ModeEditIcon />
            </IconButton>
            <IconButton onClick={() => false}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </div>
    </Box>
  );
}
