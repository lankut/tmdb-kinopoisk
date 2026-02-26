import s from './Movies.module.css';
import type {
    FilmFilters,
    MovieResponseWithMovieFavorite,
    MovieWithFavorite
} from "@/app/api/typesApi.ts";
import {useNavigate} from "react-router";
import {getPercentAndColor} from "@/common/utils/getPercentAndColor.ts";
import {useAppDispatch} from "@/common/hooks";
import {type EndpointKeys, moviesApi} from "@/app/api/moviesApi.ts";
import {noPosterAvailable} from "@/common/constants/constants.ts";
import {Pagination} from "@mui/material";
import {type ChangeEvent} from "react";
import type {FormDataSearch} from "@/common/types/types.ts";


type Props = {
    movies: MovieResponseWithMovieFavorite | undefined
    queryKey: EndpointKeys
    queryArgs: null | string | FilmFilters | undefined | FormDataSearch
    title?: string
    showButton?: boolean
    showAll?: boolean
    widthImage?: string
    justifyContent?: string
    route?: string
    setPage?: (pageNumber: number) => void
    page?: number
    filters?: FilmFilters
    setFilters?: (filters: FilmFilters) => void

};

export const Movies = ({
                           movies,
                           queryKey,
                           title,
                           showButton = true,
                           showAll = false,
                           widthImage,
                           justifyContent = 'space-between',
                           route,
                           setPage,
                           page,
                           filters,
                           setFilters,
                           queryArgs,
                       }: Props) => {


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const displayedMovies = showAll ? movies?.results : movies?.results.slice(0, 6)

    const onViewMore = () => {
        navigate(`/category_movies/${route}`)
    }
    const toggleFavorite = (favorite: {
        movieId: number,
        title: string,
        posterUrl: string,
        voteAverage: number
    }) => {
        dispatch(
            moviesApi.util.updateQueryData(queryKey, queryArgs, (draft) => {
                if ('results' in draft) {
                    const movie = draft.results.find((movie: MovieWithFavorite) => movie.id === favorite.movieId);
                    if (movie) {
                        movie.isFavorite = !movie.isFavorite;
                    }
                }
            })
        );
        const storageKey = `movieId_${favorite.movieId}`
        const existing = localStorage.getItem(storageKey)

        if (existing) {
            localStorage.removeItem(storageKey)
        } else {
            const favoriteItem = {
                movieId: favorite.movieId,
                title: favorite.title,
                posterUrl: favorite.posterUrl,
                voteAverage: favorite.voteAverage,
            }
            localStorage.setItem(storageKey, JSON.stringify(favoriteItem))
        }
    }

    const onClick = (movieId: number) => {
        navigate(`/details/${movieId}`)
    }

    const onChangePage = (_event: ChangeEvent<unknown>, value: number) => {
        if (filters && setFilters) {
            setFilters({...filters, page: value})
        }
        if (setPage) {
            setPage(value)
        }
    }

    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>{title}</h2>
            <div style={{justifyContent: justifyContent}}
                 className={s.wrapper_movies}>
                {displayedMovies?.map((movie: MovieWithFavorite) => {
                        const {
                            percent,
                            backgroundColor
                        } = getPercentAndColor(movie.vote_average)
                        return <div key={movie.id} style={{width: widthImage}}
                                    className={s.image}>
                            {movie.id && (
                                <img style={{width: widthImage}}
                                     className={s.size_movies}
                                     src={movie.poster_path
                                         ? `${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`
                                         : noPosterAvailable
                                     } alt={movie.title}
                                     onClick={() => onClick(movie.id)}
                                />
                            )}
                            <div className={s.title_movie}>{movie.title}</div>
                            <span
                                style={{backgroundColor: backgroundColor}}
                                className={s.badge}>{percent}%</span>
                            <button
                                className={`${s.favButton} ${movie.isFavorite ? s.active : ''}`}
                                onClick={() => toggleFavorite({
                                    movieId: movie.id,
                                    title: movie.title,
                                    posterUrl: movie.poster_path,
                                    voteAverage: movie.vote_average
                                })}>
                                <span
                                    className={s.heartIcon}>{movie.isFavorite ? '❤️' : '🤍'}</span>
                            </button>
                        </div>
                    }
                )}
                {showButton &&
                    <button className={s.button}
                            onClick={onViewMore}>View
                        More
                    </button>
                }
            </div>
            {(setPage || setFilters) &&
                <Pagination page={page} count={movies?.total_pages}
                            variant="outlined"
                            shape="rounded"
                            onChange={onChangePage}/>}
        </div>

    );
};