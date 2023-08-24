
"use client"
import ActionModal from "./ActionModal";
import FoodNameDataCell from "./FoodNameDataCell";
import FoodQuantityDataCell from "./FoodQuantityDataCell";
import OrderTrackingDataCell from "./OrderTrackingDataCell";

export const ALL_ORDER_COLUMNS = [
  { field: "id", headerName: "ID", width: 90 },

  {
    field: "name", // Rename this field to "action" to fix the error
    headerName: "Food Name",
    width: 200,
    editable: false,
    renderCell: ({ row }) => {
      return (
        <>
          <FoodNameDataCell instance={row} />
        </>
      );
    },
  },
  {
    field: "quantity", // Rename this field to "action" to fix the error
    headerName: "Quantity",
    width: 200,
    editable: false,
    renderCell: ({ row }) => {
      return (
        <>
          <FoodQuantityDataCell instance={row} />
        </>
      );
    },
  },
  {
    field: "total",
    headerName: "Total",
    width: 200,
    editable: false,
  },
  {
    field: "ordertrackinginfo",
    headerName: "Order Status",
    width: 200,
    editable: false,
    renderCell: ({ row }) => {
      return (
        <>
          <OrderTrackingDataCell instance={row} />
        </>
      );
    },
  },

    {
      field: "action", // Rename this field to "action" to fix the error
      headerName: "Action",
      width: 150,
      editable: false,
      renderCell: ({ row }) => {
        return (
          <>
            <ActionModal instance={row} />
            {/* <ProductDataEditModal instance={row}/> */}
          </>
        );
      },
    },
];
