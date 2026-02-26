import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {FormDataSearch} from "@/common/types/types.ts";

export type AppState = {
    searchData: FormDataSearch | undefined,
    theme: 'light' | 'dark',
    isLoading: boolean,
}

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        searchData: undefined,
        theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
        isLoading: false
    } as AppState,
    selectors: {
        selectSearchData: (state) => state.searchData,
        selectTheme: (state) => state.theme,
        selectIsLoading: (state)=> state.isLoading
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
        }),
        setLoading: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        })
    })
})
export const {
    setSearchData,
    resetResultSearch,
    toggleTheme,
    setLoading,
} = appSlice.actions;
export const {selectSearchData, selectTheme, selectIsLoading} = appSlice.selectors
export const appReducer = appSlice.reducer

