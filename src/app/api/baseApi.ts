import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'tmdbApi',
    tagTypes: ['tmdbApi'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
        },
    }),
    endpoints: () => ({}),
})

