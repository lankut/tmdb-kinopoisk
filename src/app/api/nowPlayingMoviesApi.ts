import {baseApi} from "@/app/api/baseApi.ts";
import type {MovieResponse} from "@/app/api/type.ts";

export const nowPlayingMoviesApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchMoviesNowPlaying: build.query<MovieResponse, void>({
            query: () => ({
                url: 'movie/now_playing'
            }),
            providesTags: ['tmdbApi']
        }),
    })
})

export const {useFetchMoviesNowPlayingQuery} = nowPlayingMoviesApi