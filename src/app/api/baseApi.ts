import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'tmdbApi',
    tagTypes: ['tmdbApi'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        // headers: {
        //     'API-KEY': import.meta.env.VITE_API_KEY,
        // },
        prepareHeaders: headers => {
            headers.set("Authorization", `Bearer ${import.meta.env.VITE_API_KEY}`);
            return headers;
        }
    }),
    endpoints: () => ({}),
})

