import { configureStore } from "@reduxjs/toolkit";
import { posts } from "./slices/posts";
import { authReducer } from "./slices/auth";

const store = configureStore({
	reducer: {
		posts: posts,
		auth: authReducer,
	},
});

export default store;
