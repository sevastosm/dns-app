import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({ onChange, name }: any) {
  return (
    <Autocomplete
      disablePortal
      id={name}
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} />}
      onChange={(e) => onChange(e, name)}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: "Data1" },
  { label: "Data2" },
  { label: "Data3" },
  { label: "Data4" },
  { label: "Data5" },
  { label: "Data6" },
  { label: "Data7" },
];
