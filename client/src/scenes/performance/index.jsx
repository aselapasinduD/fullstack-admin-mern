import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetUserPerformanceQuery } from "state/api";
import { useSelector } from 'react-redux';
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Performance = () => {
    const theme = useTheme();
    const userId = useSelector((state) => state.global.userId);
    const { data, isLoading } = useGetUserPerformanceQuery(userId);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 1,
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },
    ]

    return(
        <Box m="1.5rem 2.5rem">
            <Header title="PERFORMANCE" subtitle="Track your Affiliate Sales Performance Here" />
            <Box
                height="80vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none"
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`
                    },
                    "& .MuiDataGrid-withBorderColor": {
                        borderColor: "transparent !important" 
                    }
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.sales) || []}
                    columns={columns}
                    components={{ Toolbar: DataGridCustomToolbar }}
                />
            </Box>
        </Box>
    )
}

export default Performance;