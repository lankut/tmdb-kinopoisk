import {baseApi} from "@/app/api/baseApi.ts";
import type {MovieResponse} from "@/app/api/type.ts";

export const popularMoviesApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchMoviesPopular: build.query<MovieResponse, void>({
            query: () => ({
                url: 'movie/popular'
            }),
            providesTags: ['tmdbApi']
        }),
    })
})

export const {useFetchMoviesPopularQuery} = popularMoviesApi
