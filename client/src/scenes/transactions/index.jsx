import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
    const theme = useTheme();
    
    // values to be sent to the backend
    const [paginationModel, setPaginationModel] = useState({ pageSize: 20, page: 0})
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");

    const { data, isLoading} = useGetTransactionsQuery({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        sort: JSON.stringify(sort),
        search,
    });

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
            headerName: "Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 0.5,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        }
    ];

    return(
        <Box
            m="1.5rem 2.5rem"
        >
            <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
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
                    rows={(data && data.transactions) || []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[20, 50, 100]}
                    sortingMode="server"
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch }
                    }}
                />
            </Box>
        </Box>
    )
}

export default Transactions;