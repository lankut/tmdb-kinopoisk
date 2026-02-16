import {baseApi} from "@/app/api/baseApi.ts";
import type {
    MovieResponse,
    MovieResponseWithMovieFavorite
} from "@/app/api/type.ts";


export const popularMoviesApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchMoviesPopular: build.query<MovieResponseWithMovieFavorite, void>({
            query: () => ({
                url: 'movie/popular'
            }),
            transformResponse: (response: MovieResponse): MovieResponseWithMovieFavorite => ({
                ...response,
                results: response
                    .results
                    .map((movie) => ({
                        ...movie, isFavorite: false
                    }))
            }),
            providesTags: ['tmdbApi'],
        }),
    })
})

export const {useFetchMoviesPopularQuery} = popularMoviesApi
