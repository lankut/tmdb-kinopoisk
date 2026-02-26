import {baseApi} from "@/app/api/baseApi.ts";
import type {
    FilmFilters, MovieCredits,
    MovieResponse,
    MovieResponseWithMovieFavorite
} from "@/app/api/typesApi.ts";
import type {FormDataSearch} from "@/common/types/types.ts";


export const moviesApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchMoviesPopular: build.query<MovieResponseWithMovieFavorite, string | null>({
            query: (page) => ({
                url: `/popular?page=${page ?? '1'}`
            }),
            transformResponse: (response: MovieResponse): MovieResponseWithMovieFavorite => ({
                ...response,
                results: response
                    .results
                    .map((movie) => ({
                        ...movie,
                        isFavorite: localStorage.getItem(`movieId_${movie.id}`) !== null
                    }))
            }),
            providesTags: ['tmdbApi'],
        }),
        fetchMoviesTopRated: build.query<MovieResponseWithMovieFavorite, string | null>({
            query: (page) => ({
                url: `/top_rated?page=${page ?? '1'}`
            }),
            transformResponse: (response: MovieResponse): MovieResponseWithMovieFavorite => ({
                ...response,
                results: response
                    .results
                    .map((movie) => ({
                        ...movie,
                        isFavorite: localStorage.getItem(`movieId_${movie.id}`) !== null
                    }))
            }),
            providesTags: ['tmdbApi']
        }),
        fetchMoviesUpcoming: build.query<MovieResponseWithMovieFavorite, string | null>({
            query: (page) => ({
                url: `/upcoming?page=${page ?? '1'}`
            }),
            transformResponse: (response: MovieResponse): MovieResponseWithMovieFavorite => ({
                ...response,
                results: response
                    .results
                    .map((movie) => ({
                        ...movie,
                        isFavorite: localStorage.getItem(`movieId_${movie.id}`) !== null
                    }))
            }),
            providesTags: ['tmdbApi']
        }),
        fetchMoviesNowPlaying: build.query<MovieResponseWithMovieFavorite, string | null>({
            query: (page) => ({
                url: `/now_playing?page=${page ?? '1'}`
            }),
            transformResponse: (response: MovieResponse): MovieResponseWithMovieFavorite => ({
                ...response,
                results: response
                    .results
                    .map((movie) => ({
                        ...movie,
                        isFavorite: localStorage.getItem(`movieId_${movie.id}`) !== null
                    }))
            }),
            providesTags: ['tmdbApi']
        }),
        fetchMoviesSearch: build.query<MovieResponseWithMovieFavorite, FormDataSearch & {
            page?: number
        }>({
            query: ({query, page}) => ({
                url: `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`
            }),
            transformResponse: (response: MovieResponse): MovieResponseWithMovieFavorite => ({
                ...response,
                results: response
                    .results
                    .map((movie) => ({
                        ...movie,
                        isFavorite: localStorage.getItem(`movieId_${movie.id}`) !== null
                    }))
            }),
            providesTags: ['tmdbApi']
        }),
        fetchMoviesFiltered: build.query<MovieResponseWithMovieFavorite, FilmFilters | void>({
            query: (filters) => {
                if (filters) {
                    const params = new URLSearchParams();
                    if (filters.sort_by) params.append('sort_by', filters.sort_by);
                    if (filters.vote_average_gte !== undefined) params.append('vote_average.gte', filters.vote_average_gte.toString());
                    if (filters.vote_average_lte !== undefined) params.append('vote_average.lte', filters.vote_average_lte.toString());
                    if (filters.primary_release_date) params.append('primary_release_date.gte', filters.primary_release_date);
                    if (filters.original_title) params.append('original_title', filters.original_title);
                    if (filters.with_genres) {
                        const genres = Array.isArray(filters.with_genres as number[]) ? filters.with_genres.join(',') : filters.with_genres.toString();
                        params.append('with_genres', genres);
                    }
                    if (filters.page) params.append('page', filters.page.toString());

                    return `https://api.themoviedb.org/3/discover/movie?${params.toString()}`
                }

                return `https://api.themoviedb.org/3/discover/movie`
            },
            transformResponse: (response: MovieResponse): MovieResponseWithMovieFavorite => ({
                ...response,
                results: response
                    .results
                    .map((movie) => ({
                        ...movie,
                        isFavorite: localStorage.getItem(`movieId_${movie.id}`) !== null
                    }))
            }),
            providesTags: ['tmdbApi']
        }),
        fetchMoviesCredits: build.query<MovieCredits, string>({
            query: (movieId) => ({
                url: `https://api.themoviedb.org/3/movie/${movieId}/credits`
            }),
            providesTags: ['tmdbApi']
        }),
        fetchMoviesSimilar: build.query<MovieResponseWithMovieFavorite, string>({
            query: (movieId) => ({
                url: `https://api.themoviedb.org/3/movie/${movieId}/similar`
            }),
            transformResponse: (response: MovieResponse): MovieResponseWithMovieFavorite => ({
                ...response,
                results: response
                    .results
                    .map((movie) => ({
                        ...movie,
                        isFavorite: localStorage.getItem(`movieId_${movie.id}`) !== null
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
    useFetchMoviesFilteredQuery,
    useFetchMoviesCreditsQuery,
    useFetchMoviesSimilarQuery
} = moviesApi

export type moviesApiType = typeof moviesApi;
export type EndpointKeys = keyof moviesApiType['endpoints']