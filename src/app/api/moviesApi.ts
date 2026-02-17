import {baseApi} from "@/app/api/baseApi.ts";
import type {
    MovieResponse,
    MovieResponseWithMovieFavorite
} from "@/app/api/typesApi.ts";
import type {FormDataSearch} from "@/common/types/types.ts";


export const moviesApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchMoviesPopular: build.query<MovieResponseWithMovieFavorite, void>({
            query: () => ({
                url: '/popular'
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
        fetchMoviesTopRated: build.query<MovieResponseWithMovieFavorite, void>({
            query: () => ({
                url: '/top_rated'
            }),
            transformResponse: (response: MovieResponse): MovieResponseWithMovieFavorite => ({
                ...response,
                results: response
                    .results
                    .map((movie) => ({
                        ...movie, isFavorite: false
                    }))
            }),
            providesTags: ['tmdbApi']
        }),
        fetchMoviesUpcoming: build.query<MovieResponseWithMovieFavorite, void>({
            query: () => ({
                url: '/upcoming'
            }),
            transformResponse: (response: MovieResponse): MovieResponseWithMovieFavorite => ({
                ...response,
                results: response
                    .results
                    .map((movie) => ({
                        ...movie, isFavorite: false
                    }))
            }),
            providesTags: ['tmdbApi']
        }),
        fetchMoviesNowPlaying: build.query<MovieResponseWithMovieFavorite, void>({
            query: () => ({
                url: '/now_playing'
            }),
            transformResponse: (response: MovieResponse): MovieResponseWithMovieFavorite => ({
                ...response,
                results: response
                    .results
                    .map((movie) => ({
                        ...movie, isFavorite: false
                    }))
            }),
            providesTags: ['tmdbApi']
        }),
        fetchMoviesSearch: build.query<MovieResponseWithMovieFavorite, FormDataSearch>({
            query: ({query}) => ({
                url: `https://api.themoviedb.org/3/search/movie?query=${query}`
            }),
            transformResponse: (response: MovieResponse): MovieResponseWithMovieFavorite => ({
                ...response,
                results: response
                    .results
                    .map((movie) => ({
                        ...movie, isFavorite: false
                    }))
            }),
            providesTags: ['tmdbApi']
        }),
    })
})


export const {
    useFetchMoviesPopularQuery,
    useFetchMoviesTopRatedQuery,
    useFetchMoviesUpcomingQuery,
    useFetchMoviesNowPlayingQuery,
    useFetchMoviesSearchQuery,

} = moviesApi

export type moviesApiType = typeof moviesApi;
export type EndpointKeys = keyof moviesApiType['endpoints']