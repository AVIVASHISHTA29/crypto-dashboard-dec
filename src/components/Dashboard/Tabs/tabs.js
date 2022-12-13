import { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme, ThemeProvider } from "@mui/material";
import "./styles.css";
import Grid from "../Grid/grid";

function TabsComponent({ coins }) {
  const [tabValue, setTabValue] = useState("grid");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
    },
  });

  const style = {
    color: "var(--white)",
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <TabContext value={tabValue}>
          <TabList variant="fullWidth" onChange={handleChange}>
            <Tab label="Grid" value="grid" sx={style} />
            <Tab label="List" value="list" sx={style} />
          </TabList>
          <TabPanel value="grid">
            <div className="grid-flex">
              {coins.map((coin, i) => (
                <Grid coin={coin} key={i} />
              ))}
            </div>
          </TabPanel>
          <TabPanel value="list">Item Two</TabPanel>
        </TabContext>
      </ThemeProvider>
    </div>
  );
}

export default TabsComponent;
