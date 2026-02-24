export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type Dates = {
    maximum: string;
    minimum: string;
}

export type MovieResponse = {
    dates?: Dates;
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export type MovieWithFavorite = Movie & { isFavorite?: boolean }

export type MovieResponseWithMovieFavorite = MovieResponse & {
    results: MovieWithFavorite[];
}

export type FilmFilters = {
    sort_by?: string
    vote_average_gte?: number
    vote_average_lte?: number
    primary_release_date?: string
    original_title?: string
    with_genres?: number[] | undefined
    page?: number
}