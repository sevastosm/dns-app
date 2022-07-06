import React from "react";
import { Box } from "@mui/material";
import Programs from "./Programs";
import DataTable from "../../components/UI/table/Table";

export interface IAppProps {
  data: any;
}
const columns = [
  { title: "ACTIONS ", id: "actions" },

  { title: "ΕΠΩΝΥΜΙΑ ", id: "name" },
  { title: "AFM", id: "vatID" },
  { title: "ΔΙΕΥΘΥΝΣΗ ", id: "address" },
  { title: "Email", id: "email" },
  { title: "ACTIVE", id: "active" },

  // { title: "createdOn", id: "createdOn" },
  // { title: "createdBy", id: "createdBy" },
  // { title: "modifiedOn", id: "modifiedOn" },
  // { title: "modifiedBy", id: "modifiedBy" },
];

const rowInfo = (data: any) => <Programs data={data} />;

export default function Customers({ data }: IAppProps) {
  console.log("Customers", data);
  return (
    data && (
      <DataTable
        rows={data}
        headCells={columns}
        name="customers"
        add
        stickyHeader
        rowInfo={rowInfo}
      />
    )
  );
}
