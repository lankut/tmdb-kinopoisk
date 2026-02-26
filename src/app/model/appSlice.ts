import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {FormDataSearch} from "@/common/types/types.ts";

export type AppState = {
    searchData: FormDataSearch | undefined,
    theme: 'light' | 'dark',
}

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        searchData: undefined,
        theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
    } as AppState,
    selectors: {
        selectSearchData: (state) => state.searchData,
        selectTheme: (state)=>state.theme
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
        toggleTheme: create.reducer((state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
            document.documentElement.setAttribute('data-theme', state.theme)
            localStorage.setItem('theme', state.theme)
        })

    })
})
export const {
    setSearchData,
    resetResultSearch,
    toggleTheme,
} = appSlice.actions;
export const {selectSearchData, selectTheme} = appSlice.selectors
export const appReducer = appSlice.reducer

