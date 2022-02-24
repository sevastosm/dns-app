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
  // { title: "partnerID", id: "partnerID" },
  // { title: "parentID", id: "parentID" },
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
  { title: "USERNAME", id: "userName" },
  // { title: "passsword", id: "passsword" },
  { title: "ΔΕΝΤΡΟ ΚΑΤΩ ΑΠΌ", id: "competitionAr" },
  { title: "ARGO PAY SPOT", id: "argoPaySpotID" },
  { title: "ΔΕΛΤΙΟ ΣΥΣΤΑΣΗΣ ΑΠΌ ΣΥΝΕΡΓΑΤΗ", id: "recommendationSheet" },
  { title: "ΑΠΟΣΤΟΛΗ ΣΥΜΒΑΣΗΣ ΓΙΑ ΥΠΟΓΡΑΦΗ", id: "partnerToSignDate" },
  {
    title: "ΕΠΙΣΤΡΟΦΗ ΥΠΟΓΕΓΡΑΜΜΕΝΗΣ ΣΥΜΒΑΣΗΣ ΑΠΌ ΣΥΝΕΡΓΑΤΗ",
    id: "partnerSignedDate",
  },
  {
    title: "ΑΠΟΣΤΟΛΗ ΥΠΟΓΕΓΡΑΜΜΕΝΗΣ ΣΥΜΒΑΣΗΣ ΑΠΌ ΣΥΝΕΡΓΑΤΗ-ΕΤΑΙΡΕΙΑ",
    id: "contractSigned",
  },
  { title: "ΑΠΟΣΤΟΛΗ ΑΙΤΗΜΑΤΟΣ ΚΩΔΙΚΟΥ", id: "requestCode" },
  {
    title: "ΠΑΡΑΛΑΒΗ ΚΑΙ ΑΠΟΣΤΟΛΗ ΚΩΔΙΚΩΝ ΖΕΝΙΘ",
    id: "deliverZenithCodes",
  },
  { title: "ΟΙΚΙΑΚΟ ΕΠΑΓΓΕΛΜΑΤΙΚΟ ΧΑΜΗΛΗ ΤΑΣΗ", id: "homeLowVoltageID" },
  { title: "AIR TIME ΧΑΜΗΛΗΣ ΤΑΣΗΣ", id: "airTimeLowVoltage" },
  { title: "ΑΝΑΝΕΩΣΗ", id: "renewalElectricity" },
  { title: "ΜΕΣΗ ΤΑΣΗ", id: "midlVoltage" },
  { title: "AIR TIME ΜΕΣΗΣ ΤΑΣΗΣ", id: "airTimeMidlVoltage" },
  {
    title: "ΟΙΚΙΑΚΟ ΑΥΤΟΝΟΜΟ ΕΠΑΓΓΕΛΜΑΤΙΚΟ ΚΕΝΤΡΙΚΗ ΘΕΡΜΑΝΣΗ",
    id: "homeAutoProGas",
  },
  { title: "AIRTIME", id: "airTime1" },
  { title: "AIRTIME 2", id: "airTime2" },
  { title: "ΑΝΑΝΕΩΣΗ", id: "renewalGas" },
  { title: "ΣΧΟΛΙΑ", id: "comments" },
  { title: "ΤΡΑΠΕΖΑ", id: "bankID" },
  { title: "IBAN", id: "iban" },
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
    partners.map((p: any, i: number) => {
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
