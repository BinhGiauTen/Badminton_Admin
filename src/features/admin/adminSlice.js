import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import adminService from "./adminService";


const initialState = {
  admin: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const adminRegister = createAsyncThunk(
  "admin/admin-register",
  async (user, thunkAPI) => {
    try {
      return await adminService.adminRegister(user);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllUser = createAsyncThunk(
  "admin/get-all-user",
  async (_,thunkAPI) => {
    try {
      return await adminService.getAllUser();
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/del-a-user",
  async (id, thunkAPI) => {
    try {
      return await adminService.deleteUser(id);
    } catch (error) {
      console.log("Error:", error);
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllCoach = createAsyncThunk(
  "admin/get-all-coach",
  async (thunkAPI) => {
    try {
      return await adminService.getAllCoach();
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCoach = createAsyncThunk(
  "admin/del-a-coach",
  async (id, thunkAPI) => {
    try {
      return await adminService.deleteCoach(id);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAdminById = createAsyncThunk(
  "admin/get-admin-by-id",
  async (id,thunkAPI) => {
    try {
      return await adminService.getAdminById(id);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "admin/update-admin",
  async (user,thunkAPI) => {
    try {
      return await adminService.updateAdmin(user);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAdminAvatar = createAsyncThunk(
  "admin/update-admin-avatar",
  async ({id,file},thunkAPI) => {
    try {
      return await adminService.updateAdminAvatar(id,file);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetState = createAction("Reset_all");

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(adminRegister.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(adminRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.createdUser = action.payload;
    })
    .addCase(adminRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
    .addCase(getAllUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.users = action.payload;
    })
    .addCase(getAllUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.deletedUser = action.payload;
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })

    .addCase(getAllCoach.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllCoach.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.coaches = action.payload;
    })
    .addCase(getAllCoach.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(deleteCoach.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteCoach.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.deletedCoach = action.payload;
    })
    .addCase(deleteCoach.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })

    .addCase(getAdminById.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAdminById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.admin = action.payload;
    })
    .addCase(getAdminById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(updateAdmin.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.updatedUser = action.payload;
    })
    .addCase(updateAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(updateAdminAvatar.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateAdminAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.updatedUser = action.payload;
    })
    .addCase(updateAdminAvatar.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })

    .addCase(resetState, () => initialState);
  },
});

export default adminSlice.reducer;
