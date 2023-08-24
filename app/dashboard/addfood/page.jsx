"use client";

import { getImgToB64 } from "@/app/lib/imageToB64";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";

import axios from "axios";
import { enqueueSnackbar } from "notistack";

const AddFood = () => {
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
      name: "",
      price: "",
      image: "",
      description: "",
    },

    // validationSchema: ProductValidation,
    onSubmit: async (data) => {
      try {
        const response = await axios.post(
          "https://64e360ccbac46e480e78b1c3.mockapi.io/api/food-management-systems/food-management-systems",
          data
        );

        if (response.status === 201) {
          // Check the appropriate status code for successful creation
          enqueueSnackbar("Food added", {
            variant: "success",
          });
          resetForm();
        } else {
          throw new Error("Failed to add product");
        }
      } catch (error) {
        console.error(error);
        // enqueueSnackbar("Something went wrong!", {
        //   variant: "error",
        // });
      }
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className="mt-10 lg:ml-72 flex flex-col-reverse lg:flex-row  gap-10 w-full px-4 lg:px-2">
          <div className="w-full ">
            <div className="w-full">
              <TextField
                fullWidth
                required
                size="medium"
                value={values.name}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                className="w-full mt-4"
                name="name"
                onChange={handleChange}
                label="Food Name"
              />
            </div>
            <div>
              <TextField
                fullWidth
                required
                size="medium"
                value={values.price}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                className="w-full mt-4"
                name="price"
                onChange={handleChange}
                label="Price"
              />
            </div>
            <div>
              <TextField
                fullWidth
                required
                size="medium"
                value={values.description}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                className="w-full mt-4"
                name="description"
                onChange={handleChange}
                label="Description"
              />
            </div>
            <div>
              <TextField
                fullWidth
                required
                size="medium"
                value={values.image}
                error={touched.image && Boolean(errors.image)}
                helperText={touched.image && errors.image}
                className="w-full mt-4"
                name="image"
                onChange={handleChange}
                label="Image"
              />
            </div>

            <div className="">
              <div className="flex  mt-[30px]">
                <LoadingButton
                  endIcon={<SendIcon />}
                  // loading={true}
                  loadingPosition="end"
                  disabled={isSubmitting}
                  type="submit"
                  className="btn bg-[#34C997] text-white hover:text-black px-4 lg:px-7 py-[8px] lg:py-[14px] capitalize   hover:bg-[#EDF3F3] rounded-[20px]"
                >
                  {isSubmitting ? "Saving..." : "Submit"}
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
