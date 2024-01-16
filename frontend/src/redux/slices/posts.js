import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
	const { data } = await axios.get("/posts");
	return data;
});

export const getTags = createAsyncThunk("posts/getTags", async () => {
	const { data } = await axios.get("/tags");
	return data;
});

const initialState = {
	posts: {
		items: [],
		status: "loading",
	},
	tags: {
		items: [],
		status: "loading",
	},
};

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: {
		[getPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload;
			state.posts.status = "success";
		},
		[getPosts.rejected]: (state) => {
			state.posts.items = [];
			state.posts.status = "error";
		},
		[getPosts.pending]: (state) => {
			state.posts.status = "loading";
		},
		[getTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload;
			state.tags.status = "success";
		},
		[getTags.rejected]: (state) => {
			state.tags.items = [];
			state.tags.status = "error";
		},
		[getTags.pending]: (state) => {
			state.tags.status = "loading";
		},
	},
});

export const posts = postsSlice.reducer;
