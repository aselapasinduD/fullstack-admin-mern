import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAdminsQuery } from "state/api";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Admin = () => {
    const theme = useTheme();
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");
    const [paginationModel, setPaginationModel] = useState({ pageSize: 20, page: 0});
    
    const [ searchInput, setSearchInput ] = useState("");

    const { data, isLoading } =  useGetAdminsQuery({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        sort: JSON.stringify(sort),
        search
    });

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Nubmer",
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
            }
        },
        {
            field: "country",
            headerName: "Country",
            flex: 0.4,
        },
        {
            field: "occupation",
            headerName: "Occupation",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5,
        }
    ]
    return(
        <Box
            m="1.5rem 2.5rem"
        >
            <Header title="ADMINS" subtitle="List of Admins" />
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
                    rows={(data && data.admins) || []}
                    rowCount={(data && data.total) || 0}
                    columns={columns}
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[20, 50, 100]}
                    sortingmode="server"
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch}
                    }}
                />
            </Box>
        </Box>
    )
}

export default Admin;