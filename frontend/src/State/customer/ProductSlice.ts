import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Product } from "../../types/ProductTypes";

const API_URL = "https://localhost:8090"
export const fetchProductById = createAsyncThunk(
    "/product/fetchProductById",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/${productId}`)
            return response.data;
        } catch (error: any) {
            console.log("error - ", error)
            rejectWithValue(error.message);
        }
    }
)

export const searchProduct = createAsyncThunk(
    "/product/searchProduct",
    async (query, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/search`, {
                params: { query }
            })
            console.log("response - ", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error - ", error)
            rejectWithValue(error.message);
        }
    }
)

export const fetchAllProducts = createAsyncThunk<any,any>(
    "/product/fetchAllProducts",
    async (params , { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}`,{
                params:{
                    ...params,
                    pageNumber: params.pageNumber ||  0,

                }
            })
            console.log("response - ", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error - ", error)
            rejectWithValue(error.message);
        }
    }
)

interface ProductState {
    product: Product | null;
    products: Product[];
    totalPages: number;
    loading: boolean;
    error: any;
    searchProduct: Product[];
}
const initialState: ProductState = {
    product: null,
    products: [],
    totalPages: 1,
    loading: false,
    error: null,
    searchProduct: []
} 

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductById.pending, (state) => {
            state.loading = true;
        })  
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        })
        builder.addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        builder.addCase(fetchAllProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.totalPages = action.payload.totalPages;
        })
        builder.addCase(fetchAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(searchProduct.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(searchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.searchProduct = action.payload;
        })
        builder.addCase(searchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default productSlice.reducer;