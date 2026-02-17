import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {FormDataSearch} from "@/common/types/types.ts";

export type AppState = {
    searchData: FormDataSearch | undefined,
}

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        searchData: undefined,
    } as AppState,
    selectors: {
        selectSearchData: (state) => state.searchData,
    },
    // extraReducers: (builder) => {
    // },
    reducers: (create) => ({
        setSearchData: create.reducer<FormDataSearch | undefined>((state, action: PayloadAction<FormDataSearch | undefined>) => {
            state.searchData = action.payload
        }),
        resetResultSearch: create.reducer<undefined>((state) => {
            state.searchData = undefined
        }),
    })
})
export const {
    setSearchData,
    resetResultSearch,
} = appSlice.actions;
export const {selectSearchData} = appSlice.selectors
export const appReducer = appSlice.reducer

