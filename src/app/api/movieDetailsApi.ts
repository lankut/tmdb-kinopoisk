import {baseApi} from "@/app/api/baseApi.ts";
import type {MovieDetails} from "@/app/api/detailsTypes.ts";


export const movieDetailsApi = baseApi.injectEndpoints({ // перенести в другую АПИ
    endpoints: build => ({
        fetchMoviesDetails: build.query<MovieDetails, string>({
            query: (movieId) => ({
                url: `${movieId}`
            }),
            providesTags: ['tmdbApi']
        }),
    })
})

export const {useFetchMoviesDetailsQuery} = movieDetailsApi