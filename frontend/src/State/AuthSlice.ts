import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";
import { User } from "../types/UserTypes";
import { isTokenExpired } from "../utils/jwt";

/* =======================
   SEND OTP
======================= */
export const sendLoginSignupOtp = createAsyncThunk(
  "/auth/sendLoginSignupOtp",
  async (
    request: {
      email: string;
      role: string;
      purpose: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        "/auth/send-otp",
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

/* =======================
   SELLER LOGIN
======================= */
export const login = createAsyncThunk(
  "/auth/login",
  async (loginRequest: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/login", loginRequest);
      localStorage.setItem("jwt", response.data.jwt);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* =======================
   CUSTOMER LOGIN
======================= */
export const loginCustomer = createAsyncThunk(
  "/auth/loginCustomer",
  async (
    loginRequest: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        "/auth/login",
        loginRequest
      );

      localStorage.setItem(
        "jwt",
        response.data.jwt
      );

      return response.data.jwt;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =======================
   REGISTER
======================= */
export const register = createAsyncThunk(
  "/auth/signup",
  async (
    registerRequest: { fullName: string; email: string; password: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        "/auth/signup",
        registerRequest
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const sellerRegister = createAsyncThunk(
  "/seller/signup",
  async (
    sellerRequest: any,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        "/sellers/signup",
        sellerRequest
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =======================
   LOGOUT
======================= */
export const logout = createAsyncThunk(
  "/auth/logout",
  async (navigate: any) => {
    localStorage.clear();
    navigate("/");
  }
);


// =========================================
export const resetPassword = createAsyncThunk(
  "/auth/resetPassword",
  async (
    request: {
      email: string;
      otp: string;
      newPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        "/auth/reset-password",
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

export const resetSellerPassword = createAsyncThunk(
  "/seller/resetPassword",
  async (
    request: {
      email: string;
      otp: string;
      newPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        "/sellers/reset-password",
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
// ==========================================

/* =======================
   FETCH USER PROFILE
======================= */
export const fetchUserProfile = createAsyncThunk(
  "/auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/profile");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* =======================
   STATE
======================= */

const getRoleFromToken = (token: string): "USER" | "SELLER" | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.authorities?.includes("ROLE_SELLER")) return "SELLER";
    if (payload.authorities?.includes("ROLE_CUSTOMER")) return "USER";
    return null;
  } catch {
    return null;
  }
};

interface AuthState {
  jwt: string | null;
  otpSend: boolean;
  isLoggedIn: boolean;
  user: User | null;
  loading?: boolean;
  role: string | null;
}

const token = localStorage.getItem("jwt");

const isValidToken =
  !!token && !isTokenExpired(token);

if (token && !isValidToken) {
  localStorage.removeItem("jwt");
}
const initialState: AuthState = {
  jwt: token && !isTokenExpired(token) ? token : null,
  otpSend: false,
  isLoggedIn: isValidToken,
  user: null,
  role: token ? getRoleFromToken(token) : null,
  loading: false,
};

/* =======================
   SLICE
======================= */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetOtpState: (state) => {
      state.otpSend = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* OTP */
      .addCase(sendLoginSignupOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendLoginSignupOtp.rejected, (state) => {
        state.loading = false;
      })
      .addCase(sendLoginSignupOtp.fulfilled, (state) => {
        state.otpSend = true;
        state.loading = false;
      })

      /* LOGIN (Seller / Customer / Register) */
      .addCase(login.fulfilled, (state, action) => {
        state.jwt = action.payload.jwt;
        state.isLoggedIn = true;
        state.role = action.payload.role;
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.jwt = action.payload;
        state.isLoggedIn = true;
        state.role = "USER";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.otpSend = false;
      })
      .addCase(sellerRegister.pending, (state) => {
        state.loading = true;
      })

      .addCase(sellerRegister.fulfilled, (state) => {
        state.loading = false;
        state.otpSend = false;
      })

      .addCase(sellerRegister.rejected, (state) => {
        state.loading = false;
      })

      /* FETCH PROFILE */
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      /* LOGOUT */
      .addCase(logout.fulfilled, (state) => {
        state.jwt = null;
        state.isLoggedIn = false;
        state.user = null;
        state.otpSend = false;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.otpSend = false;
      })

      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default authSlice.reducer;
export const { resetOtpState } = authSlice.actions;
