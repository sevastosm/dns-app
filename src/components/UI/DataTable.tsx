import * as React from "react";
import MaterialTable from "material-table";

export default function DataTable({ data, columns = [] }: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tabeData, setData] = React.useState(data);

  return (
    <MaterialTable
      title="Editable Preview"
      columns={columns}
      data={tabeData}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve: any, reject) => {
            setTimeout(() => {
              setData([...data, newData]);

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData: any) =>
          new Promise((resolve: any, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData: any) =>
          new Promise((resolve: any, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000);
          }),
      }}
    />
  );
}
