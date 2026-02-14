import {baseApi} from "@/app/api/baseApi.ts";
import type {MovieResponse} from "@/app/api/type.ts";

export const topRatedApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchMoviesTopRated: build.query<MovieResponse, void>({
            query: () => ({
                url: 'movie/top_rated'
            }),
            providesTags: ['tmdbApi']
        }),

    })
})

export const {useFetchMoviesTopRatedQuery} = topRatedApi