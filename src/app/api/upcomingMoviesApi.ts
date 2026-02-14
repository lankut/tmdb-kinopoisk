import {baseApi} from "@/app/api/baseApi.ts";
import type {MovieResponse} from "@/app/api/type.ts";

export const upcomingMoviesApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchMoviesUpcoming: build.query<MovieResponse, void>({
            query: () => ({
                url: 'movie/upcoming'
            }),
            providesTags: ['tmdbApi']
        }),
    })
})

export const {useFetchMoviesUpcomingQuery} = upcomingMoviesApi