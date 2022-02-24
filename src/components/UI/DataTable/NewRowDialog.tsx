import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, TextField } from "@mui/material";
import Box from "@mui/material/Box";

interface Iprops {
  isOpen: boolean;
  callback: (string: boolean, data: any) => void;
  fields: any;
}

export default function NewRowDialog({ callback, isOpen, fields }: Iprops) {
  const [data, setFromData] = React.useState([]);
  const ref: any = React.useRef();
  const handleClose = (agree: boolean) => {
    if (agree) {
      ref.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
      // callback(true, data);
    } else {
      callback(false, data);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit", e);
  };

  const Fields = () => (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      {Object.keys(fields).map((f) => (
        <TextField
          required
          id="outlined-required"
          label={f}
          defaultValue={fields.f}
          name={f}
        />
      ))}
    </Box>
  );

  return (
    <div>
      <form ref={ref} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Dialog
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Save changes ?"}</DialogTitle>
          <DialogContent>
            <Fields />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(false)}>Disagree</Button>
            <Button onClick={() => handleClose(true)} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
