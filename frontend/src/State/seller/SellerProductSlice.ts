import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Product } from "../../types/ProductTypes";

export const fetchSellerProducts = createAsyncThunk<Product[], any>(
    "/sellerProduct/fetchSellerProducts",
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get("/api/sellers/products", {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            })
            return response.data;
        } catch (error) {
            console.log("error - ", error)
        }
    }
)

export const createProduct = createAsyncThunk<Product, { request: any, jwt: string | null }>(
    "/sellerProduct/createProduct",
    async (args, { rejectWithValue }) => {
        const { request, jwt } = args;
        try {
            const response = await api.post("/api/sellers/products", request, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            })
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
)
export const fetchProductById = createAsyncThunk(
  "/sellerProduct/fetchProductById",
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/sellers/products/${productId}`
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "/sellerProduct/updateProduct",
  async (
    {
      productId,
      request,
    }: {
      productId: number;
      request: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `/api/sellers/products/${productId}`,
        request
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/sellerProduct/deleteProduct",

  async (
    productId: number,
    { rejectWithValue }
  ) => {
    try {
      const jwt =
        localStorage.getItem("jwt");

      await api.delete(
        `/api/sellers/products/${productId}`,
        {
          headers: {
            Authorization:
              `Bearer ${jwt}`,
          },
        }
      );

      return productId;

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ||
        error.message
      );
    }
  }
);

interface SellerProductState {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: any;
}
const initialState: SellerProductState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null
}
const sellerProductSlice = createSlice({
    name: "sellerProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSellerProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchSellerProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        builder.addCase(fetchSellerProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload);
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(fetchProductById.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedProduct = action.payload;
        })
        builder.addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedProduct = action.payload;
            state.products = state.products.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = state.products.filter(
                (item) => item.id !== action.payload
            );
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default sellerProductSlice.reducer;
