import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const handleError = (error: unknown): void => {
  if (error instanceof Error) {
    alert(`Something went wrong: ${error.message}`);
  } else {
    alert(`Something went wrong`);
  }
  console.log(error);
};

interface ProductClient {
  name: string;
  price: string;
  image: File | null;
  _method?: "PUT";
}

interface ProductServer {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const getProducts = createAsyncThunk<
  ProductServer[],
  void,
  { rejectValue: unknown }
>("products/getProducts", async (_, thunkAPI) => {
  try {
    const response = await axios.get("https://test1.focal-x.com/api/items", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const deleteProduct = createAsyncThunk<
  number,
  number,
  { rejectValue: unknown }
>("products/deleteProduct", async (productId, thunkAPI) => {
  try {
    await axios.delete(`https://test1.focal-x.com/api/items/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return productId;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const addProduct = createAsyncThunk<
  ProductServer[],
  ProductClient,
  { rejectValue: unknown }
>("products/addProduct", async (newProduct, thunkAPI) => {
  try {
    await axios.post("https://test1.focal-x.com/api/items", newProduct, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const response = await axios.get("https://test1.focal-x.com/api/items", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const editProduct = createAsyncThunk<
  ProductServer[],
  { id: number; updateProduct: ProductClient },
  { rejectValue: unknown }
>("products/editProduct", async ({ id, updateProduct }, thunkAPI) => {
  // Destructure the object
  try {
    await axios.post(
      `https://test1.focal-x.com/api/items/${id}`,
      updateProduct,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const response = await axios.get("https://test1.focal-x.com/api/items", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: [] as ProductServer[],
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(getProducts.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(getProducts.rejected, (state, action) => {
      const error = action.payload;
      handleError(error);
    });

    // ADD PRODUCT
    builder.addCase(addProduct.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(addProduct.rejected, (state, action) => {
      const error = action.payload;
      handleError(error);
    });

    // Edit PRODUCT
    builder.addCase(editProduct.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(editProduct.rejected, (state, action) => {
      const error = action.payload;
      handleError(error);
    });

    // DELETE PRODUCT
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      return state.filter((element) => element.id !== action.payload);
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      const error = action.payload;
      handleError(error);
    });
  },
});

export { getProducts, addProduct, deleteProduct, editProduct };
export default productSlice.reducer;
