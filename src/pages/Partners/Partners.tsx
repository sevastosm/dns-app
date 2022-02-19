import * as React from "react";
import { makeRequest } from "../../api/fetch";
import { AuthContext } from "../../context/AuthContext";
import DataTable from "../../components/UI/DataTable";
import { constants } from "fs";

export interface IAppProps {}

const constructGetURL = (url: string, params: any) => {
  const queryString = encodeURIComponent(JSON.stringify(params));
  return url + queryString;
};
const columns = [
  // { title: "partnerID", field: "partnerID" },
  // { title: "parentID", field: "parentID" },
  { title: "ΟΝΟΜΑΤΕΠΩΝΥΜΟ", field: "name" },
  { title: "ΝΟΜΙΜΟΣ ΕΚΠΡΟΣΩΠΟΣ", field: "legalRepresentive" },
  { title: "ΠΕΡΙΟΧΗ", field: "district" },
  { title: "ΔΙΕΥΘΥΝΣΗ", field: "address" },
  { title: "ΤΚ", field: "zip" },
  { title: "ΙΔΙΟΤΗΤΑ", field: "ocupationID" },
  { title: "ΑΦΜ", field: "vatID" },
  { title: "ΤΗΛΕΦΩΝΟ", field: "phone1" },
  { title: "ΤΗΛΕΦΩΝΟ 2", field: "phone2" },
  { title: "ΚΙΝΗΤΟ", field: "mobile1" },
  { title: "ΚΙΝΗΤΟ 2", field: "mobile2" },
  { title: "EMAIL", field: "email" },
  { title: "ΥΠΕΥΘΥΝΟΣ ΡΕΥΜΑΤΟΣ", field: "contactName" },
  { title: "ΛΟΙΠΕΣ ΠΛΗΡΟΦΟΡΙΕΣ", field: "infos" },
  { title: "USERNAME", field: "userName" },
  // { title: "passsword", field: "passsword" },
  { title: "ΔΕΝΤΡΟ ΚΑΤΩ ΑΠΌ", field: "competitionAr" },
  { title: "ARGO PAY SPOT", field: "argoPaySpotID" },
  { title: "ΔΕΛΤΙΟ ΣΥΣΤΑΣΗΣ ΑΠΌ ΣΥΝΕΡΓΑΤΗ", field: "recommendationSheet" },
  { title: "ΑΠΟΣΤΟΛΗ ΣΥΜΒΑΣΗΣ ΓΙΑ ΥΠΟΓΡΑΦΗ", field: "partnerToSignDate" },
  {
    title: "ΕΠΙΣΤΡΟΦΗ ΥΠΟΓΕΓΡΑΜΜΕΝΗΣ ΣΥΜΒΑΣΗΣ ΑΠΌ ΣΥΝΕΡΓΑΤΗ",
    field: "partnerSignedDate",
  },
  {
    title: "ΑΠΟΣΤΟΛΗ ΥΠΟΓΕΓΡΑΜΜΕΝΗΣ ΣΥΜΒΑΣΗΣ ΑΠΌ ΣΥΝΕΡΓΑΤΗ-ΕΤΑΙΡΕΙΑ",
    field: "contractSigned",
  },
  { title: "ΑΠΟΣΤΟΛΗ ΑΙΤΗΜΑΤΟΣ ΚΩΔΙΚΟΥ", field: "requestCode" },
  {
    title: "ΠΑΡΑΛΑΒΗ ΚΑΙ ΑΠΟΣΤΟΛΗ ΚΩΔΙΚΩΝ ΖΕΝΙΘ",
    field: "deliverZenithCodes",
  },
  { title: "ΟΙΚΙΑΚΟ ΕΠΑΓΓΕΛΜΑΤΙΚΟ ΧΑΜΗΛΗ ΤΑΣΗ", field: "homeLowVoltageID" },
  { title: "AIR TIME ΧΑΜΗΛΗΣ ΤΑΣΗΣ", field: "airTimeLowVoltage" },
  { title: "ΑΝΑΝΕΩΣΗ", field: "renewalElectricity" },
  { title: "ΜΕΣΗ ΤΑΣΗ", field: "midlVoltage" },
  { title: "AIR TIME ΜΕΣΗΣ ΤΑΣΗΣ", field: "airTimeMidlVoltage" },
  {
    title: "ΟΙΚΙΑΚΟ ΑΥΤΟΝΟΜΟ ΕΠΑΓΓΕΛΜΑΤΙΚΟ ΚΕΝΤΡΙΚΗ ΘΕΡΜΑΝΣΗ",
    field: "homeAutoProGas",
  },
  { title: "AIRTIME", field: "airTime1" },
  { title: "AIRTIME 2", field: "airTime2" },
  { title: "ΑΝΑΝΕΩΣΗ", field: "renewalGas" },
  { title: "ΣΧΟΛΙΑ", field: "comments" },
  { title: "ΤΡΑΠΕΖΑ", field: "bankID" },
  { title: "IBAN", field: "iban" },
  // { title: "createdOn", field: "createdOn" },
  // { title: "createdBy", field: "createdBy" },
  // { title: "modifiedOn", field: "modifiedOn" },
  // { title: "modifiedBy", field: "modifiedBy" },
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

  return <DataTable data={filterd} columns={columns} />;
}
