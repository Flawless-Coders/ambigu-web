import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { span } from "framer-motion/client";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DishesCategoryTabs({ enabledAndDisabled }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (enabledAndDisabled) {
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircleOutlineIcon sx={{ marginRight: 1 }} />
                  Habilitados
                </Box>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <RemoveCircleOutlineIcon sx={{ marginRight: 1 }} />
                  Inhabilitados
                </Box>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Habilitados
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Inhabilitados
        </CustomTabPanel>
      </Box>
    );
  } else {
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Entradas" {...a11yProps(0)} />
            <Tab label="Plato Fuerte" {...a11yProps(1)} />
            <Tab label="Postres" {...a11yProps(2)} />
            <Tab label="Bebidas" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Nachos
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Tacos
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Mantecadas
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          Dr Pepper
        </CustomTabPanel>
      </Box>
    );
  }
}
