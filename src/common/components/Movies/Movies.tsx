import s from './Movies.module.css';
import type {
    MovieResponseWithMovieFavorite,
    MovieWithFavorite
} from "@/app/api/typesApi.ts";
import {useNavigate} from "react-router";
import {Path} from "@/common/routing";
import {getPercentAndColor} from "@/common/utils/getPercentAndColor.ts";
import {useAppDispatch} from "@/common/hooks";
import {type EndpointKeys, moviesApi} from "@/app/api/moviesApi.ts";
import {noPosterAvailable} from "@/common/constants/constants.ts";


type Props = {
    movies: MovieResponseWithMovieFavorite | undefined
    queryKey: EndpointKeys
    title?: string
    showButton?: boolean
    showAll?: boolean
};

export const Movies = ({
                           movies,
                           queryKey,
                           title,
                           showButton = true,
                           showAll = false,
                       }: Props) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const displayedMovies = showAll ? movies?.results : movies?.results.slice(0, 6)

    const onViewMore = () => {
        navigate(Path.CategoryMovies) //тоже подправить разные категории
    }
    const toggleFavorite = (movieId: number) => {
        dispatch(
            moviesApi.util.updateQueryData(queryKey, undefined, (draft) => {
                const movie = draft.results.find((movie: MovieWithFavorite) => movie.id === movieId);
                if (movie) {
                    movie.isFavorite = !movie.isFavorite;
                }
            })
        );
    }

    const onClick = (movieId: number) => {
        navigate(`/details/${movieId}`)
    }

    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>{title}</h2>
            <div className={s.wrapper_movies}>
                {displayedMovies?.map((movie: MovieWithFavorite) => {
                        const {
                            percent,
                            backgroundColor
                        } = getPercentAndColor(movie.vote_average)

                        return <div key={movie.id} className={s.image}>
                            {movie.id && (
                                <img className={s.size_movies}
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
                                onClick={() => toggleFavorite(movie.id)}>
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
        </div>

    );
};