import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {MovieResponse} from "@/app/api/type.ts";
import type {FormDataSearch} from "@/common/types/types.ts";

export const baseApi = createApi({
    reducerPath: 'tmdbApi',
    tagTypes: ['tmdbApi'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        // headers: {
        //     'API-KEY': import.meta.env.VITE_API_KEY,
        // },
        prepareHeaders: headers => {
            headers.set("Authorization", `Bearer ${import.meta.env.VITE_API_KEY}`);
            return headers;
        }
    }),
    endpoints: (build) => ({
        fetchMoviesPopular: build.query<MovieResponse, void>({
            query: () => ({
                url: 'movie/popular'
            }),
            providesTags: ['tmdbApi']
        }),
        fetchMoviesSearch: build.query<MovieResponse, FormDataSearch>({
            query: ({query}) => ({
                url: `/search/movie?query=${query}`
            }),
            providesTags: ['tmdbApi']
        }),
        fetchMoviesTopRated: build.query<MovieResponse, void>({
            query: () => ({
                url: 'movie/top_rated'
            }),
            providesTags: ['tmdbApi']
        }),

    }),
})

export const {
    useFetchMoviesPopularQuery,
    useFetchMoviesSearchQuery,
    useFetchMoviesTopRatedQuery
} = baseApi