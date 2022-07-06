export const skatoula = "";

export const constructCompanyProperties = (
  selectedCompany: any,
  companies: any,
  cooperations: any = []
) => {
  console.log("selectedCompany", selectedCompany);
  const propertyList = cooperations.filter(
    (d: any) => d.companyID === selectedCompany
  );

  console.log("propertyList", propertyList);

  return propertyList.length !== 0
    ? Object.keys(companies[selectedCompany]).map((k: keyof any, i) => {
        return {
          id: i,
          name: companies[selectedCompany][k],
          value: propertyList[0][k] || "",
        };
      })
    : [];
};
