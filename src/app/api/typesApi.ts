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

export type CastMember = {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string | null
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export type CrewMember = {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string | null
    credit_id: string
    department: string
    job: string
}

export type MovieCredits = {
    id: number
    cast: CastMember[]
    crew: CrewMember[]
}
