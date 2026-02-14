import {baseApi} from "@/app/api/baseApi.ts";
import type {MovieResponse} from "@/app/api/type.ts";
import type {FormDataSearch} from "@/common/types/types.ts";

export const moviesSearchApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchMoviesSearch: build.query<MovieResponse, FormDataSearch>({
            query: ({query}) => ({
                url: `/search/movie?query=${query}`
            }),
            providesTags: ['tmdbApi']
        }),

    })
})

export const {useFetchMoviesSearchQuery} = moviesSearchApi