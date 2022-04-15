//  @ts-nocheck
import {
  Container,
  MenuItem,
  Select,
  Box,
  Tab,
  Tabs,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import React from "react";
import Form from "../../components/UI/crudForm/Form";
import { companies } from "../../mocks/companies";

import { constructCompanyProperties } from "./utils";

import PartnerStatus from "./PartnersStatus";

type Props = { data: any };

export default function PartnerDetails({ data }: Props) {
  const [company, setCompany] = React.useState<any>(1);
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const properties = constructCompanyProperties(
    company,
    companies,
    data.cooperations
  );

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  return (
    // <Container maxWidth="lg">
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, minWidth: "150ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ maxWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Εταιρεία</InputLabel>
          <Select
            labelId="select-label"
            value={company}
            label="Εταιρεία"
            onChange={(e) => setCompany(e.target.value)}
          >
            <MenuItem value={1}>Zenith</MenuItem>
            <MenuItem value={2}>Nova</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Στοιχεια" {...a11yProps(0)} />
          <Tab label="Πελατες" {...a11yProps(1)} />
          <Tab label="Commission" {...a11yProps(2)} />
        </Tabs>
      </div>
      <div>
        <TabPanel value={value} index={0}>
          <Form data={properties} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PartnerStatus />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h2> Στο επόμεο version 😜 !!!</h2>
        </TabPanel>
      </div>
    </Box>
    // </Container>
  );
}
