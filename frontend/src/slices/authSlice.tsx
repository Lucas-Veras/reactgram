import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/AuthService";

const userJson = localStorage.getItem("user");
const user = userJson !== null ? JSON.parse(userJson) : null;

const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

// Register an user and sign in
export const register: any = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    const data: any = await authService.register(user);

    // check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  },
);

// Logout an user
export const logout: any = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Sign in an user
export const login: any = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    const data: any = await authService.login(user);

    // check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
