"use client"

import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const EditOrderModal = ({ instance }) => {
  // console.log(instance.ordertrackinginfo)
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateOrderTrackingInfo = async (orderId, orderTrackingInfo) => {
    try {
      const response = await axios.put(
        `https://64e360ccbac46e480e78b1c3.mockapi.io/api/food-management-systems/food-order/${orderId}`,
        {
          ordertrackinginfo: orderTrackingInfo,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      ordertrackinginfo: instance?.ordertrackinginfo ?? "",
    },

    onSubmit: async (data) => {
        try {
          setUpdating(true); // Start update
          await updateOrderTrackingInfo(instance.id, data.ordertrackinginfo);
      
          enqueueSnackbar("Updated successfully", {
            variant: "success",
          });
      
          // Close dialog and update local state
          handleClose();
          instance.ordertrackinginfo = data.ordertrackinginfo; // Update local state
        } catch (error) {
          console.log(error);
          enqueueSnackbar("Something went wrong!", {
            variant: "error",
          });
        } finally {
          setUpdating(false); // End update
        }
      },
  });

  return (
    <div>
      <div className="">
        <Button
          className="flex justify-end border-none hover:border-none capitalize"
          onClick={handleClickOpen}
        >
          Edit Order
        </Button>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Edit Order</DialogTitle>
          <DialogContent>
            <div>
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <div>
                  <div className="w-full">
                    <TextField
                      fullWidth
                      required
                      size="small"
                      value={values.ordertrackinginfo}
                      error={
                        touched.ordertrackinginfo &&
                        Boolean(errors.ordertrackinginfo)
                      }
                      helperText={
                        touched.ordertrackinginfo && errors.ordertrackinginfo
                      }
                      className="w-full lg:mt-4"
                      name="ordertrackinginfo"
                      onChange={handleChange}
                      label="Order Status"
                    />
                  </div>

                  <div className="flex  mt-[20px] ">
                    <LoadingButton
                      endIcon={<SendIcon />}
                      loading={updating}
                      loadingPosition="end"
                      disabled={isSubmitting}
                      type="submit"
                      className="btn bg-[#34C997] text-white hover:text-black px-4 lg:px-7 py-[8px] lg:py-[14px] capitalize   hover:bg-[#EDF3F3] rounded-[20px]"
                    >
                      {isSubmitting ? "Saving..." : "Submit"}
                    </LoadingButton>
                  </div>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EditOrderModal;
