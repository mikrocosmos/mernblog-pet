import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUser = createAsyncThunk("/auth/fetchUser", async (params) => {
	const { data } = await axios.post("/auth/login", params);
	return data;
});

const initialState = {
	data: null,
	status: "loading",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
		},
	},
	extraReducers: {
		[fetchUser.pending]: (state) => {
			state.status = "loading";
			state.data = null;
		},
		[fetchUser.rejected]: (state) => {
			state.status = "error";
			state.data = null;
		},
		[fetchUser.fulfilled]: (state, action) => {
			state.status = "success";
			state.data = action.payload;
		},
	},
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
