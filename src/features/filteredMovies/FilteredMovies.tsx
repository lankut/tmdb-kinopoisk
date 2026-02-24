import s from './FilteredMovies.module.css'
import {RangeSlider} from "@/common/components/RangeSlider";
import {useFetchMoviesFilteredQuery} from "@/app/api/moviesApi.ts";
import type {FilmFilters} from "@/app/api/typesApi.ts";
import {type ChangeEvent, useCallback, useRef, useState} from "react";
import {Movies} from "@/common/components/Movies";

type GenresType = {
    id: number,
    title: string
    genreId: number
    active: boolean
}

export const FilteredMovies = () => {

    const defaultFilters = {
        sort_by: '',
        vote_average_gte: 0.0,
        vote_average_lte: 10.0,
        primary_release_date: '',
        original_title: '',
        with_genres: [],
        page: 1,
    }

    const [filters, setFilters] = useState<FilmFilters>(defaultFilters)

    const {data} = useFetchMoviesFilteredQuery(filters)

    const resetDefault = defaultFilters

    const genresData = [
        {id: 1, title: 'Action', genreId: 28, active: false},
        {id: 2, title: 'Adventure', genreId: 12, active: false},
        {id: 3, title: 'Animation', genreId: 16, active: false},
        {id: 4, title: 'Comedy', genreId: 35, active: false},
        {id: 5, title: 'Crime', genreId: 80, active: false},
        {id: 6, title: 'Documentary', genreId: 99, active: false},
        {id: 7, title: 'Drama', genreId: 18, active: false},
        {id: 8, title: 'Family', genreId: 10751, active: false},
        {id: 9, title: 'Fantasy', genreId: 14, active: false},
        {id: 10, title: 'History', genreId: 36, active: false},
        {id: 11, title: 'Horror', genreId: 27, active: false},
        {id: 12, title: 'Music', genreId: 10402, active: false},
        {id: 13, title: 'Mystery', genreId: 9648, active: false},
        {id: 14, title: 'Romance', genreId: 10479, active: false},
        {id: 15, title: 'Science Fiction', genreId: 878, active: false},
        {id: 16, title: 'TV Movie', genreId: 10770, active: false},
        {id: 17, title: 'Thriller', genreId: 53, active: false},
        {id: 18, title: 'War', genreId: 10752, active: false},
        {id: 19, title: 'Western', genreId: 37, active: false},
    ]

    const [genres, setActive] = useState<GenresType[]>(genresData)

    const debounceTimeout = useRef<number | null>(null);

    const handleInputChange = useCallback((value: number[]) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = window.setTimeout(() => {
            setFilters(prev => ({
                ...prev,
                vote_average_gte: value[0] / 10,
                vote_average_lte: value[1] / 10,
            }))
        }, 1000);
    }, []);


    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({
            ...prev,
            sort_by: e.target.value
        }));
    };

    const handleRageChange = (val: number[]) => {
        handleInputChange(val)
    }

    const handleSetGenres = (val: number, id: number) => {
        setActive(prev =>
            prev.map((el) => el.id === id ? {...el, active: !el.active} : el)
        )
        setFilters(prev => {
            const genres = prev.with_genres || [];
            const isAlreadySelected = genres.includes(val);

            const newGenres = isAlreadySelected
                ? genres.filter(genre => genre !== val)
                : [...genres, val];

            return {
                ...prev,
                with_genres: newGenres,
            };
        });
    };

    const onResetFilters = () => {
        setFilters({...resetDefault})
        setActive(genresData)
    }


    return (
        <div className={s.wrapper_filter}>
            <div className={s.filter}>
                <h2 className={s.title}>Filters / Sort </h2>
                <div>
                    Sort by <select value={filters.sort_by} className={s.title}
                                    onChange={handleSortChange}>
                    <option value='popularity.desc'>Popularity ⭣</option>
                    <option value='popularity.asc'>Popularity ⭡</option>
                    <option value='vote_average.desc'>Rating ⭣</option>
                    <option value='vote_average.asc'>Rating ⭡</option>
                    <option value="release_date.desc">Release date ⭣</option>
                    <option value="release_date.asc">Release date ⭡</option>
                    <option value="original_title.asc">Title A-Z</option>
                    <option value="original_title.desc">Title Z-A</option>
                </select>
                    <div>
                        <span>Rating </span>
                        <span>{`${filters.vote_average_gte?.toFixed(1)} - ${filters.vote_average_lte?.toFixed(1)}`}</span>
                        <RangeSlider handleRageChange={handleRageChange}
                                     value={filters.vote_average_gte && filters.vote_average_lte ? [filters.vote_average_gte, filters.vote_average_lte] : [0.0, 10.0]}/>
                    </div>
                    <div className={s.wrapper_genre_buttons}>
                        {genres.map((genre) => <button key={genre.id}
                                                       className={`${s.genre_button} ${genre.active && s.active}`}
                                                       onClick={() => handleSetGenres(genre.genreId, genre.id)}
                        >{genre.title}</button>)}
                    </div>
                    <button style={{
                        marginTop: '30px'
                    }} className={s.genre_button}
                            onClick={onResetFilters}> Reset filters
                    </button>
                </div>
            </div>
            <div>
                <Movies movies={data} queryKey={'fetchMoviesFiltered'}
                        showButton={false} showAll={true}
                        page={filters.page} setFilters={setFilters}
                        filters={filters} queryArgs={filters}
                />
            </div>
        </div>
    );
};