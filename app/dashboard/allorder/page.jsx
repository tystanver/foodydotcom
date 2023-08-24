"use client";

import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { ALL_ORDER_COLUMNS } from "./assests/AllOrderColums";


// const ALL_ORDER_COLUMNS = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: "total",
//     headerName: "Total",
//     width: 200,
//     editable: false,
//   },
// ]

const CustomToolbar = () => {
  return (
    <GridToolbarContainer className="flex justify-between">
      {/* <GridToolbarColumnsButton /> */}
      {/* <DeleteTeacherModal /> */}
    </GridToolbarContainer>
  );
};

// default component
const AllOrder = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://64e360ccbac46e480e78b1c3.mockapi.io/api/food-management-systems/food-order"
        );
        const responseData = await response.json();
        console.log("Fetched data:", responseData);
        setData(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-10 lg:ml-72">
      <div style={{ width: "100%" }} className="h-[86vh]">
        <h2 className="text-xl font-semibold mb-2">All Order</h2>
        <DataGrid
          columns={ALL_ORDER_COLUMNS}
          rows={data}
          rowCount={data.length}
          components={{
            Toolbar: CustomToolbar,
            LoadingOverlay: LinearProgress,
          }}
          disableColumnMenu
          loading={isLoading}
          disableSelectionOnClick
          pagination
          paginationMode="server"
          rowsPerPageOptions={[limit]}
          page={page}
          pageSize={limit}
          onPageChange={(newPage) => {
            setPage(newPage);
            setOffset(newPage * limit);
          }}
          className="text-xs"
          getRowHeight={() => "auto"}
        ></DataGrid>
      </div>
    </div>
  );
};

export default AllOrder;
