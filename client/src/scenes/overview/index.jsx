import React, { useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";

const Overview = () => {
    const [view, setview] = useState("units");
    return(
        <Box m="1.5rem 2.5rem">
            <Header title="OVERVIEW" subtitle="Overview of general revenue and profit" />
            <Box height="75vh">
                <FormControl
                    sx={{
                        mt: "1rem"
                    }}
                >
                    <InputLabel>View</InputLabel>
                    <Select 
                        value={view}
                        label="View"
                        onChange={(e) => setview(e.target.value)}
                    >
                        <MenuItem value="sales">Sales</MenuItem>
                        <MenuItem value="units">Units</MenuItem>
                    </Select>
                </FormControl>
                <OverviewChart view={view} />
            </Box>
        </Box>
    )
}

export default Overview;