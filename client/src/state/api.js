import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "addminApi",
    tagTypes: [
        "User",
        "Products",
        "Customers",
        "Transactions",
        "Geography",
        "Sales",
        "Admins",
        "Performance",
        "Dashboard"
    ],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Products"]
        }),
        getCustomer: build.query({
            query: ({page, pageSize, sort, search}) => ({
                url: "client/customers",
                method: "GET",
                params: { page, pageSize, sort, search}
                }),
            providesTags: ["Customers"]
        }),
        getTransactions: build.query({
            query: ({page, pageSize, sort, search}) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search}
            }),
            providesTags: ["Transactions"]
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: "Geography"
        }),
        getSales: build.query({
            query: () => "sales/sales",
            providesTags: ["Sales"]
        }),
        getAdmins: build.query({
            query: ({page, pageSize, sort, search}) => ({
                url: "management/admins",
                method: "GET",
                params: { page, pageSize, sort, search}
                }),
            providesTags: ["Admins"]
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"]
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"]
        })
    }),
});

export const { 
    useGetUserQuery, 
    useGetProductsQuery, 
    useGetCustomerQuery, 
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery
} = api;