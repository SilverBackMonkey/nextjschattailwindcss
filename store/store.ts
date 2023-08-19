import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authSlice } from "./slices/authSlice";
import {modalSlice} from "./slices/modalSlice";

export const store = configureStore({
        reducer: {
            [authSlice.name]: authSlice.reducer, 
            [modalSlice.name] : modalSlice.reducer
        },
        devTools: true,
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch