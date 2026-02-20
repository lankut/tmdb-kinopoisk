import {baseApi} from "@/app/api/baseApi.ts";
import type {
    FilmFilters,
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
        fetchMoviesFiltered: build.query<MovieResponseWithMovieFavorite, FilmFilters | void>({
            query: (filters) => {
                if (filters) {
                    const {
                        sort_by, vote_average_gte, vote_average_lte,
                        page, primary_release_date, original_title, with_genres
                    } = filters
                    const params = new URLSearchParams()
                    if (with_genres) params.append('with_genres', with_genres.toString())
                    if (sort_by) params.append('sort_by', sort_by)

                    return `https://api.themoviedb.org/3/discover/movie?${params.toString()}`
                }

                return `https://api.themoviedb.org/3/discover/movie`
            },
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
    useFetchMoviesFilteredQuery
} = moviesApi

export type moviesApiType = typeof moviesApi;
export type EndpointKeys = keyof moviesApiType['endpoints']