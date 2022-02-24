import { useEffect, useCallback } from "react";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import { SaveRounded } from "@material-ui/icons";

interface IProps {
  saveOrder: (values: any) => void;
}

export const NewRow = ({ saveOrder }: IProps) => {
  const getGroups = useCallback(async () => {}, []);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const handleSave = () => {};

  return (
    <TableRow>
      <TableCell>{/* data */}</TableCell>
      <TableCell>
        <IconButton onClick={handleSave} color="primary" component="span">
          <SaveRounded />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
