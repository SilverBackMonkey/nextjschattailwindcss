import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    show : false,
}

export const modalSlice = createSlice({
    name: 'modalShow',
    initialState,
    reducers: {
        setShow(state, action) {
            state.show = action.payload;
        },
        extraReducers: {
            [HYDRATE]: (state, action) => {
                return {
                    ...state,
                    ...action.payload.show
                }
            }
        }
    }
})

export const { setShow } = modalSlice.actions;
export default modalSlice.reducer;