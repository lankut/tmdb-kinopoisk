import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {FormDataSearch} from "@/common/types/types.ts";
import type {MovieResponse} from "@/app/api/type.ts";

export type AppState = {
    resultSearch: FormDataSearch | undefined,
    popularMovies: MovieResponse | undefined
}

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        resultSearch: undefined,
        popularMovies: undefined
    } as AppState,
    selectors: {
        selectResultSearch: (state) => state.resultSearch,
        selectPopularMovies: (state) => state.popularMovies
    },
    // extraReducers: (builder) => {
    // },
    reducers: (create) => ({
        setSearchResult: create.reducer<FormDataSearch | undefined>((state, action: PayloadAction<FormDataSearch | undefined>) => {
            state.resultSearch = action.payload
        }),
        resetResultSearch: create.reducer<undefined>((state) => {
            state.resultSearch = undefined
        }),
        setPopularMovies: create.reducer<MovieResponse | undefined>((state, action) => {
            state.popularMovies = action.payload
        })
    })
})
export const {
    setSearchResult,
    resetResultSearch,
    setPopularMovies
} = appSlice.actions;
export const {selectResultSearch, selectPopularMovies} = appSlice.selectors
export const appReducer = appSlice.reducer

