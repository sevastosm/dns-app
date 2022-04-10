import * as React from "react";
import { makeRequest } from "../../api/fetch";
import { AuthContext } from "../../components/UI/context/AuthContext";
import DataTable from "../../components/UI/table/Table";
import PartnerDetails from "./PartnerDetails";

export interface IAppProps {}

const constructGetURL = (url: string, params: any) => {
  const queryString = encodeURIComponent(JSON.stringify(params));
  return url + queryString;
};
const columns = [
  { title: "ACTIONS", id: "actions" },
  { title: "ΟΝΟΜΑΤΕΠΩΝΥΜΟ", id: "name" },
  { title: "ΝΟΜΙΜΟΣ ΕΚΠΡΟΣΩΠΟΣ", id: "legalRepresentive" },
  { title: "ΠΕΡΙΟΧΗ", id: "district" },
  { title: "ΔΙΕΥΘΥΝΣΗ", id: "address" },
  { title: "ΤΚ", id: "zip" },
  { title: "ΙΔΙΟΤΗΤΑ", id: "ocupationID" },
  { title: "ΑΦΜ", id: "vatID" },
  { title: "ΤΗΛΕΦΩΝΟ", id: "phone1" },
  { title: "ΤΗΛΕΦΩΝΟ 2", id: "phone2" },
  { title: "ΚΙΝΗΤΟ", id: "mobile1" },
  { title: "ΚΙΝΗΤΟ 2", id: "mobile2" },
  { title: "EMAIL", id: "email" },
  { title: "ΥΠΕΥΘΥΝΟΣ ΡΕΥΜΑΤΟΣ", id: "contactName" },
  { title: "ΛΟΙΠΕΣ ΠΛΗΡΟΦΟΡΙΕΣ", id: "infos" },
  { title: "ΤΡΑΠΕΖΑ", id: "bankID" },
  { title: "IBAN", id: "iban" },
];

export default function Partners(props: IAppProps) {
  const url = constructGetURL("/Partners/obj?pars=", { SearchValue: "" });
  const { partners, setPartners } = React.useContext(AuthContext);

  const getPartners = React.useCallback(async () => {
    const data = await makeRequest("GET", url);
    setPartners(data);
  }, [setPartners, url]);

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
  // return <> PAPAPALALALAL</>;
  return (
    <>
      partners && (
      <DataTable
        onRowclick={() => false}
        rows={constuctData}
        headCells={columns}
        name=""
        add
        stickyHeader
      />
      <PartnerDetails />
    </>
  );
}
