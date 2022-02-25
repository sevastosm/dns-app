import * as React from "react";
import { makeRequest } from "../../api/fetch";
import { AuthContext } from "../../components/UI/DataTable/context/AuthContext";
import DataTable from "../../components/UI/table/Table";

export interface IAppProps {}

const constructGetURL = (url: string, params: any) => {
  const queryString = encodeURIComponent(JSON.stringify(params));
  return url + queryString;
};
const columns = [
  { title: "ΕΠΩΝΥΜΙΑ ΣΥΝΕΡΓΑΤΗ ", id: "name" },
  { title: "ΚΑΤΑΧΩΡΗΣΕΙ ΦΕΒΡΟΥΑΡΙΟΣ ΕΝΕΡΓΕΙΑ ", id: "infos" },
  { title: "FOR SIGNATURE ", id: "infos" },
  { title: "REPRESENTATION PENDIND ", id: "infos" },
  { title: "READY FOR REPRESENTATION ", id: "infos" },
  { title: "ACTIVE", id: "infos" },

  // { title: "createdOn", id: "createdOn" },
  // { title: "createdBy", id: "createdBy" },
  // { title: "modifiedOn", id: "modifiedOn" },
  // { title: "modifiedBy", id: "modifiedBy" },
];

export default function Partners(props: IAppProps) {
  const url = constructGetURL("/Partners/obj?pars=", { SearchValue: "" });
  const { partners, setPartners } = React.useContext(AuthContext);

  const getPartners = React.useCallback(async () => {
    const data = await makeRequest("GET", url);
    setPartners(data);
  }, [setPartners, url]);

  const filterd =
    partners &&
    partners.map((d: any) => {
      const {
        partnerID,
        parentID,
        createdOn,
        createdBy,
        modifiedOn,
        modifiedBy,
        passsword,
        ...rest
      } = d;
      return rest;
    });

  React.useEffect(() => {
    getPartners();
  }, [getPartners]);

  const constuctData =
    partners &&
    partners
      .filter((p: any) => p.partnerID !== 7)
      .map((p: any, i: number) => {
        return { ...p, id: i, editMode: false };
      });

  return (
    partners && (
      <DataTable
        onRowclick={() => false}
        rows={constuctData}
        headCells={columns}
        name=""
        add
        stickyHeader
      />
    )
  );
}
