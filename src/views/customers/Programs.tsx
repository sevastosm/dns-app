import React from "react";
import { Box } from "@mui/material";

import DataTable from "../../components/UI/table/Table";

export interface IAppProps {
  data: any;
}
const columns = [
  { title: "ACTIONS ", id: "actions" },

  { title: "ΠΡΟΓΡΑΜΜΑ ", id: "name" },
  { title: "ΗΜ ΕΝΑΡΞΗΣ", id: "startDate" },
  { title: "ΗΜ ΛΗΞΗΣ ", id: "endDate" },
];

export default function Programs({ data }: IAppProps) {
  console.log("Programs", data);
  return (
    <DataTable
      rows={data.programs}
      headCells={columns}
      name="customers"
      add
      stickyHeader
      // rowInfo={() => "skaat"}
    />
  );
}
