import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { api } from "../../config/Api";

import { Seller } from "../../types/SellerTypes";


export const fetchSellerProfile = createAsyncThunk<
  Seller,
  void,
  { rejectValue: any }
>(
  "/sellers/fetchSellerProfile",

  async (_, { rejectWithValue }) => {

    try {

      const response = await api.get(
        "/sellers/profile"
      );

      return response.data;

    } catch (error: any) {

      return rejectWithValue(
        error.response?.data ||
        error.message ||
        "Failed to fetch seller profile"
      );

    }

  }
);


interface SellerState {

  sellers: Seller[];

  selectedSeller: Seller | null;

  profile: Seller | null;

  report: any;

  loading: boolean;

  error: any;

}


const initialState: SellerState = {

  sellers: [],

  selectedSeller: null,

  profile: null,

  report: null,

  loading: false,

  error: null,

};


const sellerSlice = createSlice({

  name: "sellers",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchSellerProfile.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        }
      )

      .addCase(
        fetchSellerProfile.fulfilled,
        (state, action) => {

          state.loading = false;

          state.profile = action.payload;

        }
      )

      .addCase(
        fetchSellerProfile.rejected,
        (state, action) => {

          state.loading = false;

          state.error = action.payload;

        }
      );

  },

});


export default sellerSlice.reducer;